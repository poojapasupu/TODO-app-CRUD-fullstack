import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/reduxLogic";

const Header = () => {
  const username = useSelector((state) => state.login.username);
  const isLoggedin = useSelector((state) => state.login.isLoggedIn);
  const dispatchFn = useDispatch();

  const logoutHandler = () => {
    dispatchFn(loginActions.logout());
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand" href='/' onClick={logoutHandler}>
            TodoApp
          </a>
          {isLoggedin && (
          <ul className="navbar-nav">
            <li>
              <NavLink activeClassName='active' className="nav-link" to={`/welcome/${username}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' className="nav-link" to="/todos">
                Todos
              </NavLink>
            </li>
          </ul>)}
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isLoggedin && (
              <li>
                <NavLink activeClassName='active' className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {isLoggedin && (
              <li>
                <NavLink activeClassName='active' className="nav-link" to="/logout" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
