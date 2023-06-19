import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TimestampContext from "../context/PressedButtonContext";
import DataScreen from "../screens/DataScreen";
import TimestampScreen from "../screens/TimeStampScreen";
import AuthContext from "../auth/context";
import DataMedicScreenNavigator from "../screens/DateMedicScreenNagivator";

function parseDate(input) {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  const hour = input.slice(9, 11);
  const minute = input.slice(11, 13);
  const second = input.slice(13, 15);

  const dateObj = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second)
  );
  const formattedDate =
    ("0" + dateObj.getUTCDate()).slice(-2) +
    "/" +
    ("0" + (dateObj.getUTCMonth() + 1)).slice(-2) +
    "/" +
    dateObj.getUTCFullYear() +
    " - " +
    ("0" + dateObj.getUTCHours()).slice(-2) +
    ":" +
    ("0" + dateObj.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + dateObj.getUTCSeconds()).slice(-2);

  return formattedDate;
}

const Stack = createStackNavigator();

export default function FeedAlerteNavigator() {
  const { user } = useContext(AuthContext);

  const sensorData = Object.entries(JSON.parse(user.data).RECOMANDARI).map(
    ([date, data]) => ({
      date: parseDate(date),
      ...data,
      status: "Neinitializat",
    })
  );

  const [timestamps, setTimestamps] = useState(sensorData);

  const setStatus = (date, status) => {
    setTimestamps((prevTimestamps) =>
      prevTimestamps.map((item) =>
        item.date === date ? { ...item, status } : item
      )
    );
  };

  return (
    <TimestampContext.Provider value={{ timestamps, setStatus }}>
      <Stack.Navigator initialRouteName="Timestamps">
        <Stack.Screen
          name="Home"
          component={DataMedicScreenNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Lista activitati" component={TimestampScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
      </Stack.Navigator>
    </TimestampContext.Provider>
  );
}
