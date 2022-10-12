import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddPackage from "./pages/AddPackagePage";
import ViewPackage from "./pages/ViewPackagesPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./store/auth";
import { useContext } from "react";

function App() {
  const ctx = useContext(AuthContext);
  console.log(ctx.isLoggIn);
  console.log(!!ctx.token);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      

        {ctx.isLoggIn && (
          <>
            {" "}
            <Route path="/addpackage">
              <AddPackage />
            </Route>
            <Route path="/viewpackage">
              <ViewPackage />
            </Route>
          </>
        )}

        {!ctx.isLoggIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
