import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Acasă"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Conectare" component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
