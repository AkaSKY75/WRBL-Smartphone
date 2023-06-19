import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

function DateMedicScreenNagivator({ navigation }) {
  return (
    <View style={styles.container}>
      <AppButton
        title="Lista Activitati"
        onPress={() => navigation.navigate("Lista activitati")}
      />
      <AppButton title="Alerte" onPress={() => console.log("Button 2")} />
      <AppButton
        title="Modul Bluetooth"
        onPress={() => console.log("Button 3")}
      />
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
