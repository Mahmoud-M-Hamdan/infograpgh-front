import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>The Shipping</div>
      </Link>
      <nav>
        <ul>
          {ctx.isLoggIn && (
            <>
              {" "}
              <li>
                <Link to="/addpackage">Add package</Link>
              </li>
              <li>
                <Link to="/viewpackage">View packages</Link>
              </li>
              <li>
                <button onClick={ctx.loggOut}>Logout</button>
              </li>
            </>
          )}
          {!ctx.isLoggIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
