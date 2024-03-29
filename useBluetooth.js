import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import * as ExpoDevice from "expo-device";
import BackgroundTimer from 'react-native-background-timer';
import Constants from './constants';
import CryptoES from 'crypto-es';

export default function BluetoothClassic() {
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
    }, 250); // la 250 target
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

  function replaceNonAlphaNumeric(str){
    //console.log(" inainte " + str);
    const result = str.replace(/[^a-zA-Z0-9]/g,'0');
    //console.log(" dupa"  + result);
    return result;
  }

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
        json += replaceNonAlphaNumeric(dataReceived.data);
        console.log(counter);
        counter += 1;
    } else if(counter == 40) {
        counter = 41;
        json += "\"}";
        console.log(json, json.length);
        console.log(dataReceived.data);
        json = {
          ...JSON.parse(json),
          ...JSON.parse(dataReceived.data)
        };
        // {"zdhkiD0tncyg2phTEWn72p8IJE2yRYmaAIUT3EA/mK4=": {"appid": "YzfeftUVcZ6twZw1OoVKPRFYTrGEg01Q",
        //  "id_pacient": "0", "nonce": "s874rmab", "val_senzor_ecg": "",
        //  "val_senzor_puls": "0", "val_senzor_temperatura": "14.00", "val_senzor_umiditate": "14.00"}}
        json["appid"] = Constants.APP_ID;
        json["nonce"] = Math.random().toString(36).slice(5);
        json["id_pacient"] = "0"; // Use AsyncStorage here to get id for patient
        json["is_alert"]= "0";
        json["accelerometru_x"] = "0";
        json["accelerometru_y"] = "0";
        json["accelerometru_z"] = "0";
        const hmac = CryptoES.HmacSHA256(JSON.stringify(json), Constants.APP_SECRET).toString(CryptoES.enc.Base64);
        result = {}
        result[hmac] = json;
        console.log(result);

        counter = 0;
        /*json["val_senzor_ecg"] = ...
        json["val_senzor_puls"] = ...
        json["val_senzor_umiditate"] = ...
        json["val_senzor_temperatura"] = ...*/
        fetch('http://162.0.238.94/api/smartphone/add/valori_senzor', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result)
        }).then((response) => response.text()
        .then((data) => {
          console.log(data);
        }));
    }
    //console.log(json);

  };



  return { tryFindWRBL, device, connection, connect, disconnect, data };
}