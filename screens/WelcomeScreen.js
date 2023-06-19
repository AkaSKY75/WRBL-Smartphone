import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/WRBL-background1.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/WRBL.jpg")} />
        <Text style={styles.tagLine}>Bine ați venit în aplicația WRBL!</Text>
        <Text style={styles.tagLine}>
          Pentru a vă autentifica apăsați butonul de mai jos!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Conectare"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
      </View>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 120,
    height: 90,
    borderRadius: 25,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagLine: {
    fontSize: 25,
    color: "white",
    fontWeight: "600",
    paddingVertical: 20,
    textAlign: "center",
  },
});
