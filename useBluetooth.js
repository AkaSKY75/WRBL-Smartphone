import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import * as ExpoDevice from "expo-device";
import BackgroundTimer from 'react-native-background-timer';

export default function BluetoothClassic(onReceivedDataScan) {
  const [device, setDevice] = useState();
  const [data, setData] = useState([]);
  const [connection, setConnection] = useState(false);
  let json = "";
  let counter = 0;


  const startBackgroundWorker = async () => {
    BackgroundTimer.runBackgroundTimer(async () => {
        try {
            const connection = await device.isConnected();
            if (connection === true) {
                if (counter === 0) {
                  json = "{\"val_senzor_ecg\":\"";
                }
                if (counter < 40) {
                    device.write("0");
                    device.read();
                } else if (counter === 40) {
                    device.write("1");
                    device.read();
                }
            }
    
        } catch (err) {
            console.log("An error occurred: ", err);
        }
    }, 5000);
  }

  useEffect(() => {
    device && setTimeout(() => connect(), 0);
  }, [device]);

  const addData = (message) => setData(prev => [message, ...prev]);

  const connect = async () => {
    try {
      let connection = await device.isConnected();
      if (!connection) {
        addData({
          data: `Attempting connection to ${device.address}`,
          timestamp: new Date(),
          type: 'error',
        });

        connection = await device.connect();
        await startBackgroundWorker();//BackgroundTimer.runBackgroundTimer(startBackgroundWorker, 5000); // trebuie la 250 (ms)
        console.log("connected!");

        addData({
          data: 'Connection successful',
          timestamp: new Date(),
          type: 'info',
        });
      } else {
        addData({
          data: `Connected to ${device.address}`,
          timestamp: new Date(),
          type: 'error',
        });
      }

      setConnection(connection);
      initializeRead();
    } catch (error) {
      addData({
        data: `Connection failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  };

  const disconnect = async (disconnected) => {
    console.log('disconnected', disconnected);
    BackgroundTimer.stopBackgroundTimer();
    connect();
    try {
      if (!disconnected) {
        disconnected = await device.disconnect();
      }

      addData({
        data: 'Disconnected',
        timestamp: new Date(),
        type: 'info',
      });

      setConnection(!disconnected);
    } catch (error) {
      addData({
        data: `Disconnect failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }

    // Clear the reads, so that they don't get duplicated
    uninitializeRead();
  };



  const initializeRead = () => {
    disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => disconnect(true));

    readSubscription = device.onDataReceived(data => onReceivedData(data));
  };

  /**
 * Clear the reading functionality.
 */
  const uninitializeRead = () => {
    /*if (readInterval) {
      clearInterval(readInterval);
    }*/
    if (readSubscription) {
      readSubscription.remove();
    }
  };

  const getBondedDevices = async () => {
    console.log('-- GETTING BONDED DEVICES --');
    try {
      const listBondedDevices = await RNBluetoothClassic.getBondedDevices();
      return listBondedDevices?.find(e => { return e.name === "WRBL" && e.id === "00:06:66:F2:34:9F" });
      
    } catch (err) {
      console.log(err);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Classic requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };


  const tryFindWRBL = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      let dv = await getBondedDevices();
      if (dv === undefined) {
        console.log('-- SCANNING FOR DEVICES --');
        try {
          const listScannedDevices = await RNBluetoothClassic.startDiscovery();
          dv = listScannedDevices?.find(e => { return e.name === "WRBL" && e.id === "00:06:66:F2:34:9F" });
          if (dv !== undefined) {
            dv = await RNBluetoothClassic.pairDevice(device.id);
            if (dv !== undefined) {
                setDevice(dv);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else { // device is already bonded
        setDevice(dv);
      }
    }
  };

  const onReceivedData = (event) => {
    event.timestamp = new Date();
    const dataReceived = {
      ...event,
      timestamp: new Date(),
      type: 'receive',
    };
    addData(dataReceived);

    if(counter < 40) {
        json += dataReceived.data;
        console.log(counter);
        counter += 1
    } else if(counter == 40) {
        json += json+"\"}"+dataReceived.data+"}";
        counter = 0;
    }
    console.log(json);
    onReceivedDataScan?.(json);
  };



  return { tryFindWRBL, device, connection, connect, disconnect, data };
}