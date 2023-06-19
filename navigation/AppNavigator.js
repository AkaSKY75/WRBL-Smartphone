import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "./routes";
import FeedAlerteNavigator from "./FeedAlerteNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import DateMedicScreenNavigator from "../screens/DateMedicScreenNagivator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Date medic"
        component={FeedAlerteNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cont"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
