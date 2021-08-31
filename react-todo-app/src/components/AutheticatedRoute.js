import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AutheticatedRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return <>{isLoggedIn && <Route {...props}>{props.children}</Route>}
            {!isLoggedIn && <Redirect to='/login'></Redirect>}</>;
};

export default AutheticatedRoute;
