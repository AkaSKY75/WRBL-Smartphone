import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AuthNavigator from "./navigation/AuthNavigator";
import navigationTheme from "./navigation/navigationTheme";
import { navigationRef } from "./navigation/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import ContextWrapper from "./context/ContextWrapper";
import OfflineNotice from "./components/OfflineNotice";
import AuthContext from "./auth/context";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ContextWrapper>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? console.log(user) : <AuthNavigator />}
        </NavigationContainer>
      </ContextWrapper>
    </AuthContext.Provider>
  );
}
