import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme, // copiem toate proprietatile din DefaultTheme si facem override la colors
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary, // cand suntem in Login screen si vrem sa ne intoarcem la alt screen in stanga sus schimbam culoarea
    background: colors.white,
  },
};
