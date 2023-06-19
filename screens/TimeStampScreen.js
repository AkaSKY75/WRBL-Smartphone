import React from "react";
import { StyleSheet, View } from "react-native";
import TimestampContext from "../context/PressedButtonContext";
import AppButton from "../components/AppButton";

const TimestampScreen = ({ navigation }) => {
  const { timestamps, setStatus } = React.useContext(TimestampContext);

  return (
    <View style={styles.container}>
      {timestamps.map((item) => (
        <AppButton
          key={item.date}
          title={`${item.date} \n Status: ${item.status}`}
          onPress={() => navigation.navigate("Data", { item })}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
export default TimestampScreen;
