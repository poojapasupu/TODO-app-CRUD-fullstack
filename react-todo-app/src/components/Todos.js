import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRestCall } from "../api/restApi";
import LoadingSpinner from "./loading/LoadingSpinner";
import { httpActions } from "../store/reduxLogic";
import TodosList from "./TodosList";
import { useHistory } from "react-router-dom";

const Todos = () => {
  const {
    todos: todoArray,
    error,
    status,
    notification,
  } = useSelector((state) => state.http);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.username);
  const { getTodosList } = useRestCall();
  const history = useHistory();

  useEffect(() => {
    getTodosList(username);
  }, [getTodosList, username]);

  const hideNotification = () => {
    dispatch(httpActions.updateNotification(null));
  };

  const addHandler = () => {
    history.push(`/todos/-1`);
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && error) {
    return <div className="centered">{error}</div>;
  }
  const todos = [...todoArray];

  return (
    <div>
      <h1>TODO LIST</h1>
      {notification && (
        <div className="alert alert-success" onClick={hideNotification}>
          {notification}
        </div>
      )}
      {todos && todos.length > 0 && <TodosList todos={todos} />}
      {todos.length === 0 && <h3>No todos found, add todos below!</h3>}

      <div className="container">
        <div className="row">
          <button className="btn btn-success" onClick={addHandler}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
