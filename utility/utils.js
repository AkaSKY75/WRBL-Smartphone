import { nanoid } from "nanoid";

const palette = {
  tealBlue: "#34495E",
  lightG: "#CED3D8",
  skyblue: "#34b7f1",
  smokeWhite: "#ece5dd",
  white: "white",
  gray: "#3C3C3C",
  lightGray: "#757575",
  iconGray: "#717171",
};

export const theme = {
  colors: {
    background: palette.smokeWhite,
    foreground: palette.tealBlue,
    primary: palette.tealBlue,
    tertiary: palette.lightG,
    secondary: palette.tealBlue,
    white: palette.white,
    text: palette.gray,
    secondaryText: palette.lightGray,
    iconGray: palette.iconGray,
  },
};
