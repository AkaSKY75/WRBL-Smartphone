import { useContext } from "react";
import AuthContext from "./context";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const logIn = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
  };

  return { user, logIn, logOut };
};
