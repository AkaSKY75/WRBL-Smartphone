import React from "react";
import { Text } from "react-native";
import defaultStyle from "../../config/styles";

function AppText({ children }) {
  return <Text style={defaultStyle.text}>{children}</Text>;
}

export default AppText;
