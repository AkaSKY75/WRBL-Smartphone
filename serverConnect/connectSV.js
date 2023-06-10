import CryptoES from "crypto-es";
import { useContext } from "react";
import AuthContext from "../auth/context";

const APP_ID = "YzfeftUVcZ6twZw1OoVKPRFYTrGEg01Q";
const APP_SECRET = "4G91qSoboqYO4Y0XJ0LPPKIsq8reHdfa";

const makeAuthentication = (cnp, password) => {
  const nonce = Math.random().toString(36).slice(5);

  body = {
    appid: APP_ID,
    cnp,
    parola: CryptoES.SHA256(password).toString(CryptoES.enc.Hex),
    nonce: nonce,
  };
  const hmac = CryptoES.HmacSHA256(JSON.stringify(body), APP_SECRET).toString(
    CryptoES.enc.Base64
  );
  result = {};
  result[hmac] = body;
  //console.log(result);
  return result;
};

export async function signIn(cnp, password) {
  //const { user, setUser } = useContext(AuthContext);

  try {
    //console.log(cnp + " " + password);
    const returnHashedBody = makeAuthentication(cnp, password);

    return await fetch("http://162.0.238.94/api/smartphone/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(returnHashedBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          //console.log(data);
          return data;
        }
      });
  } catch (error) {
    //setLoginFailed(true);
    console.log(error);
  }
}
