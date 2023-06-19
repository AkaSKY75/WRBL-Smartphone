import React from "react";
import { Button, View } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View>
    <Button
      title="Go to Screen One"
      onPress={() => navigation.navigate("ScreenOne")}
    />
    <Button
      title="Go to Screen Two"
      onPress={() => navigation.navigate("ScreenTwo")}
    />
    <Button
      title="Go to Screen Three"
      onPress={() => navigation.navigate("ScreenThree")}
    />
  </View>
);

export default HomeScreen;
