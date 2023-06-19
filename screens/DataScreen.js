import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TimestampContext from "../context/PressedButtonContext";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText/AppText";
import AppFormField from "../components/forms/AppFormField";

const DataScreen = ({ route }) => {
  const { item } = route.params;
  const [lastPressed, setLastPressed] = useState(null);
  const { setStatus } = React.useContext(TimestampContext);

  const handleStatusChange = (status) => {
    setStatus(item.date, status);

    setLastPressed(status);
  };

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.title}>Data: {item.date}</Text>
      <View style={styles.dataRow}>
        <AppText style={styles.label}>Durata:</AppText>
        <AppText style={styles.value}>{item.durata}</AppText>
      </View>
      <View style={styles.dataRow}>
        <AppText style={styles.label}>Tip:</AppText>
        <AppText style={styles.value}>{item.tip}</AppText>
      </View>
      <View style={styles.dataRow}>
        <AppText style={styles.label}>Alte indicatii:</AppText>
        <AppText style={styles.value}></AppText>
      </View>
      <AppButton
        color={item.status === "START" ? "primary" : "oblue"}
        title="START"
        onPress={() => handleStatusChange("START")}
      />
      <AppButton
        color={item.status === "PAUSE" ? "primary" : "oblue"}
        title="PAUSE"
        onPress={() => handleStatusChange("PAUSE")}
      />
      <AppButton
        color={item.status === "FINISHED" ? "primary" : "oblue"}
        title="FINISHED"
        onPress={() => handleStatusChange("FINISHED")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DataScreen;
