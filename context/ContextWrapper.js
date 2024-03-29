import React from "react";
import Context from "./Context";
import { theme } from "../utility/utils";

export default function ContextWrapper(props) {
  return (
    <Context.Provider
      value={{
        theme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
