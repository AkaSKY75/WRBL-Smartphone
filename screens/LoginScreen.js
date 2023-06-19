import { StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import ErrorMessage from "../components/forms/ErrorMessage";
import AppForm from "../components/forms/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import { signIn } from "../serverConnect/connectSV";
import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  cnp: Yup.string().required().min(13).max(13).label("Cnp"),
  password: Yup.string().required().min(4).label("Parola"),
});

export default function App() {
  // const { user, setUser } = useContext(AuthContext);
  const { logIn } = useAuth();
  const { cnpValid, setCNPValid } = useState(true);

  const handleSubmit = async ({ cnp, password }) => {
    try {
      const result = await signIn(cnp, password);
      //.log(result);
      //const parser = JSON.parse(result.data);
      //console.log(parser);
      if(result.status === "success")
        logIn(result);
      else alert(result.message);
    } catch (error) {
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
          placeholder="CNP"
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
