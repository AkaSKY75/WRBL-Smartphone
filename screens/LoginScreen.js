import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Screen from "../components/Screen";
import ErrorMessage from "../components/forms/ErrorMessage";
import AppForm from "../components/forms/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import CryptoES from "crypto-es";
import { signIn } from "../serverConnect/connectSV";
import { useEffect, useContext } from "react";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  cnp: Yup.string().required().min(13).max(13).label("Cnp"),
  password: Yup.string().required().min(4).label("Parola"),
});

export default function App() {
  const { user, setUser } = useContext(AuthContext);
  const handleSubmit = async ({ cnp, password }) => {
    try {
      const result = await signIn(cnp, password);
      setUser(result);
      //if (result.status === "failure") console.log("esuare");
      //else if (result.status === "success") console.log("a mers");
    } catch (error) {
      //setLoginFailed(true);
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/WRBL.jpg")} />
      <AppForm
        initialValues={{ cnp: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="CNP-ul sau parola sunt gresite!" visible={false} />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="user"
          keyboardType="numeric"
          name="cnp"
          placeholder="Cnp"
          maxLength={13}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Parola"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Conectare" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 120,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
