import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions, jwtAuthenticationCall } from "../store/reduxLogic";
import { useHistory } from "react-router-dom";
import "../App.css";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatchFn = useDispatch();
  const history = useHistory();
  const [invalid, setInvalid]= useState(false);

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    setInvalid(false);
    if (
      usernameRef.current.value.length === 0 ||
      passwordRef.current.value.length === 0
    ) {
      return;
    }
    console.log(usernameRef.current.value, passwordRef.current.value);

    // basicAuthenticationCall(
    //   usernameRef.current.value,
    //   passwordRef.current.value
    // )
    //   .then((response) => {
    //     dispatchFn(
    //       loginActions.login({
    //         username: usernameRef.current.value,
    //         password: passwordRef.current.value,
    //       })
    //     );
    //     history.replace(`/welcome/${usernameRef.current.value}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setInvalid(true);
    //   });

    jwtAuthenticationCall(
      usernameRef.current.value,
      passwordRef.current.value
    )
      .then((response) => {
        dispatchFn(
          loginActions.jwtlogin({
            username: usernameRef.current.value,
            token: response.data.token
          })
        );
        history.replace(`/welcome/${usernameRef.current.value}`);
      })
      .catch((error) => {
        console.log(error);
        setInvalid(true);
      });
  };

  return (
    <>
    {invalid && <div className="alert alert-warning">Invalid Credentials</div>}
      <h1>Login</h1>
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" ref={usernameRef}></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passwordRef}></input>
          </div>
          <div>
            <button className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
