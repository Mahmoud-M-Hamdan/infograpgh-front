import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { AuthContext } from "../../store/auth";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(null);
  const userNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = isLogin
      ? {
          password: passwordRef.current.value,
          email: emailRef.current.value,
        }
      : {
          password: passwordRef.current.value,
          email: emailRef.current.value,
          username: userNameRef.current.value,
          phoneNumber: phoneRef.current.value,
        };
    const sendData = async () => {
      setLoad("wait please . . .")
      let url;
      if (isLogin) {
        url = "http://localhost:3030/users/login";
      } else {
        url = "http://localhost:3030/users";
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoad("You will be in soon . . .")

        if (!response.ok) {
          setLoad(null)
          throw "the email or password is not valid!";
        }
        const data = await response.json();
        console.log(data.token);
        console.log(data)
        ctx.loggIn(data.token,data.username);
        setLoad(null)
        history.push("/");
      } catch (error) {
        setError(error)
      }
    };

    sendData();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin ? (
          <>
            <div className={classes.control}>
              <label htmlFor="username">Your UserName</label>
              <input type="text" id="username" ref={userNameRef} required />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">Your Phone Number</label>
              <input
                type="tel"
                pattern="[0]{2}-[0-9]{3}-[0-9]{9}"
                id="phone"
                ref={phoneRef}
                required
              />
              <small>Format: 00-962-789077777</small>
            </div>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            <div className={classes.actions}>
              <button>{isLogin ? "Login" : "Create Account"}</button>
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            {load && <p>{load}</p>}
            {error&&<p>{error}</p>}
            <div className={classes.actions}>
              <button>{isLogin ? "Login" : "Create Account"}</button>
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
       
          </>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
