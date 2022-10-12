import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import classes from "./StartingPageContent.module.css";
const StartingPageContent = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx.user)
  return (
    <section className={classes.starting}>
      {ctx.isLoggIn && (
        <>
          {" "}
          <h1>Welcome {ctx.user} on Our Website</h1>
          <p>enjoy 😃</p>
        </>
      )}{" "}
      {!ctx.isLoggIn && (
        <>
          <h1>Welcome on Our Website!</h1>
          <p>
            Kindly, you must register first before using the features of our
            site
            <br /> Please go to the login page
          </p>
        </>
      )}
    </section>
  );
};

export default StartingPageContent;
