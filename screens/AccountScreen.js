import React from "react";
// import ListItem from "../lists";
import ListItem from "../components/ListItem";
import Screen from "../screens/Screen";
import { View, Button, StyleSheet } from "react-native";
import colors from "../config/colors";
import Icon from "../components/Icon";
import useAuth from "../auth/useAuth";

function AccountScreen() {
  const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#34495E" />}
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    marginBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default AccountScreen;
