import React, { useState } from "react";
import AuthNavigator from "./navigation/AuthNavigator";
import navigationTheme from "./navigation/navigationTheme";
import { navigationRef } from "./navigation/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import ContextWrapper from "./context/ContextWrapper";
import OfflineNotice from "./components/OfflineNotice";
import AuthContext from "./auth/context";
import AppNavigator from "./navigation/AppNavigator";
import TimestampContext from "./context/PressedButtonContext";

export default function App() {
  const [user, setUser] = useState();
  const [timestamps, setTimestamps] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ContextWrapper>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </ContextWrapper>
    </AuthContext.Provider>
  );
}
