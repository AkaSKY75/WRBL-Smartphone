import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import * as ExpoDevice from "expo-device";
import CryptoES from 'crypto-es';
import BackgroundTimer from 'react-native-background-timer';
//import * as BackgroundFetch from "expo-background-fetch";
//import * as TaskManager from "expo-task-manager";

const TASK_NAME = "BACKGROUND_TASK";

/*TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + Math.random();
    console.log("My task ", receivedNewData);
    
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (err) {
    console.log(err, BackgroundFetch.BackgroundFetchResult);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});*/

export default function Home() {
  /*const asyncTaskCreate = async () => {
    try {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
      if (isRegistered) {
         try
         {
            await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
            console.log("Task unregistered successfully!");
         } catch (err) {
            console.log('Error when unregistering task: ', err);
         }
      }

      try {
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 5, // seconds,
        });
        console.log("Task registered");
      } catch (err) {
        console.log("Task Register failed:", err);
      }

    } catch (err) {
      console.log("Task Registered check failed:", err);
    }
  };*/

/*
  Login interface: CNP + Password
  fetch('http://162.0.238.94/api', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
*/

/*
  Connect Smartphone to Arduino
  Request permission for Android => We already have it in project from C:\Users\MPSAM\Documents\WRBL\Smartphone
  Implement scan and pair
*/

  const APP_ID = "YzfeftUVcZ6twZw1OoVKPRFYTrGEg01Q";
  const APP_SECRET = "4G91qSoboqYO4Y0XJ0LPPKIsq8reHdfa";
  const makeAuthentication = (cnp, password) => {
    const nonce = Math.random()
      .toString(36)
      .slice(5);

    body = {
        "appid": APP_ID,
        "cnp": cnp,
        "parola": CryptoES.SHA256(password).toString(CryptoES.enc.Hex),
        "nonce": nonce  
    };
    
    const hmac = CryptoES.HmacSHA256(JSON.stringify(body), APP_SECRET).toString(CryptoES.enc.Base64);
    result = {}
    result[hmac] = body;
    console.log(result);
    return result;
  };
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
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


  const onReceivedDataScan = useCallback((data) => {
    console.log('data?.data', data?.data); // ========> Get response here
    alert(data?.data);
  }, []);

  const main = () => {
    const body = makeAuthentication('1700928416180', '12345');
    fetch('http://162.0.238.94/api/smartphone/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
      });
    
    tryFindWRBL().then(async (device) => {
        try {
          const connected = await device.isConnected();
          if (connected) {
            await device.disconnect();
            console.log("Device disconnected!");
          }
          await device.connect();
          await device.write("0\n", "utf-8");
          const buff = await device.read();
          console.log(buff, device);
          await device.disconnect();
          const startBackgroundWorker = async () => {
            BackgroundTimer.runBackgroundTimer(async () => { 
              //code that will be called every 3 seconds
              const connected = await device.isConnected();
              if (!connected) {
                await device.connect();
                console.log("Device connected!");
              }
              if (device !== null) {
                //const buff = await device.read();
                await device.write("0");
                const buff = await device.read();
                console.log(buff);

                //BackgroundTimer.stopBackgroundTimer();
              }
        
            }, 250);
          }
          //await startBackgroundWorker();
        } catch (err) {
          console.log("Error! Could not connect to device! ", err);
        }
    });

    /*useEffect(() => {
      if (device) {
        //asyncTaskCreate();
        /*BackgroundTimer.runBackgroundTimer(async () => { 
          //code that will be called every 3 seconds
          
          if (device !== null) {
            //const buff = await device.read();
            console.log(device);
          }
    
        }, 3000);
        console.log(device);
      }
        //rest of code will be performing for iOS on background too
    }, [device]);*/
  }

  /*useEffect(() => {
    fetch('http://162.0.238.94/api/smartphone', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    }).then(function(response) {
      console.log(response);
      response.body.getReader().read().then(function(stream) {
        console.log(stream.value);
      });
    });
    scanForDevices();
    makeAuthentication('1700928416180', '12345');
  }, []);*/

  const getBondedDevices = async () => {
    console.log('-- GETTING BONDED DEVICES --');
    try {
      const listBondedDevices = await RNBluetoothClassic.getBondedDevices();
      //console.log(listBondedDevices);
      return listBondedDevices?.find(e => { return e.name === "WRBL" && e.id === "00:06:66:F2:34:9F" });
      
    } catch (err) {
      console.log(err);
    }
  };

  const tryFindWRBL = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      const dv = await getBondedDevices();
      if (dv === null) {
        console.log('-- SCANNING FOR DEVICES --');
        try {
          const listScannedDevices = await RNBluetoothClassic.startDiscovery();
          //console.log(listScannedDevices);
          return listScannedDevices?.find(e => { return e.name === "WRBL" && e.id === "00:06:66:F2:34:9F" });
          /*RNBluetoothClassic.startDiscovery().then(function(devices){
            for(var i = 0; i < devices.length; i++)
            {
              if(devices[i].name == "WRBL" && devices[i].address == "00:06:66:F2:34:9F") {
                console.log(devices[i].name + " " + devices[i].address);
                RNBluetoothClassic.pairDevice(devices[i].address).then(function(device){
                  console.log("Pair successfull");
                });
              }
            }
          });*/
        } catch (err) {
          console.log(err);
        }
      }
      return dv;
    }
  };

  return (
    <View>
      <Pressable onPress={main} style={buttonStyles.button}>
        <Text style={buttonStyles.text}>Example button</Text>
      </Pressable>
    </View>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 2
  },
  text: {
    color: "#fff",
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
    textTransform: "uppercase"
  }
});