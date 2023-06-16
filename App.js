import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
//import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import CryptoES from 'crypto-es';
//import BackgroundTimer from 'react-native-background-timer';
import useBluetooth from './useBluetooth';
/*import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "BACKGROUND_TASK";

TaskManager.defineTask(TASK_NAME, () => {
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

  const { tryFindWRBL, device, connection, connect, disconnect, data } = useBluetooth(onReceivedDataScan);

  const onReceivedDataScan = useCallback((data) => {
    console.log('data?.data', data?.data); // ========> Get response here
    alert(data?.data);
  }, []);

  //const {subscription, setSubscription} = useState();

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

  const main = () => {
  
    if (connection === false) {
      tryFindWRBL();

    } else {
      disconnect();
      try {
      } catch (err) {
        console.log("[ ERROR ]: ", err);
      }
    }
        /*let json = "{\"val_senzor_ecg\":\"";
        const connected = await device.isConnected();
        if (connected === false) {
          await device.connect();
          await device.write("0");
          await device.read();
          // Aici timer
          const startBackgroundWorker = async () => {
            BackgroundTimer.runBackgroundTimer(async () => { 
              //code that will be called every 3 seconds
              if (device !== null) {
                try
                {
                  await device.connect();
                  const bytes = await device.available();
                  if (bytes !== 0) {
                    const data = await device.read();
                    console.log(data);
                  } else {
                    console.log("No data available!");
                  }
                  await device.disconnect();

                } catch (err) {
                  console.log("An error occurred: ", err);
                }
      
                //BackgroundTimer.stopBackgroundTimer();
              }
        
            }, 5000);
          }
          //startBackgroundWorker();
          //await startBackgroundWorker();
        }
      } catch (err) {
        console.log("Error! Could not connect to device! ", err);
      }
    }*/
            
  }

/*
  Pressable cu disconnect
  Inainte sa salvezi codul, sa apesi butonul disconnect

 */

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