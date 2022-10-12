import { createContext, Provider, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({
 user:"",
  loggIn: (token) => {},
  loggOut: () => {},
  token: "",
  isLoggIn: false,
});

const AuthProvider = (props) => {
const initialtoken=localStorage.getItem('token')
const initialuser=localStorage.getItem('username')
  const history=useHistory()
  const [token, setToken] = useState(initialtoken);
  const [userName, setUserName] = useState(initialuser);


  const loggIn = (token,username) => {
    setToken(token);
    setUserName(username)
    localStorage.setItem("token", token)
    localStorage.setItem("username", username)

    console.log(token)
  ;
  };
  const loggOut = () => {
    setToken(null);
    setUserName(null)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push('/')
  };

  const isLog=  !!token
  const authValue = {
    user:userName,
    loggIn: loggIn,
    loggOut: loggOut,
    token: token,
    isLoggIn: isLog,
  };
  return <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
