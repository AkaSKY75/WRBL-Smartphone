import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import CryptoES from 'crypto-es';
import useBluetooth from './useBluetooth';
import Constants from './constants';


export default function Home() {

  const { tryFindWRBL, device, connection, connect, disconnect, data } = useBluetooth();

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
  } 
  return (
    <View>
      <Pressable onPress={main} style={buttonStyles.button}>
        <Text style={buttonStyles.text}>Example button</Text>
      </Pressable>
    </View>
  );
}