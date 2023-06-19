import React from "react";
import { View, StyleSheet } from "react-native";
import useAuth from "../auth/useAuth";
import AppButton from "../components/AppButton";

function LogOutScreen(props) {
  const { user, logOut } = useAuth();
  return (
    <View style={styles.buttonsContainer}>
      <AppButton title="Log Out" onPress={() => logOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
});

export default LogOutScreen;
