import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import useBluetooth from "../useBluetooth";

function DateMedicScreenNagivator({ navigation }) {
  const { tryFindWRBL, device, connection, connect, disconnect, data } = useBluetooth();
  const [showBluetoothButton, setShowBluetoothButton] = useState(true);

  useEffect(() => {
    
    if (connection === false) {
      setShowBluetoothButton(true);
    } else {
      setShowBluetoothButton(false);
    }
  }, [connection]);

  return (
    <View style={styles.container}>
      <AppButton
        title="Lista Activitati"
        onPress={() => navigation.navigate("Lista activitati")}
      />
      <AppButton title="Alerte" onPress={() => console.log("Button 2")} />
      {showBluetoothButton && <AppButton
        title="Modul Bluetooth"
        onPress={tryFindWRBL}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DateMedicScreenNagivator;
