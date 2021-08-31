import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "./loading/LoadingSpinner";
import { useRestCall } from "../api/restApi";
import moment from "moment";
import FormTodo from "./FormTodo";

const TodoItem = () => {
  const params = useParams();
  const status = useSelector((state) => state.http.status);
  const error = useSelector((state) => state.http.error);
  const username = useSelector((state) => state.login.username);
  const { getTodoDetail, putTodo, postTodo } = useRestCall();
  const [todo, setTodo] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (id === "-1" || id === -1) return;
    const fetchData = async () => {
      const response = await getTodoDetail(username, id);
      setTodo({
        ...response,
        targetDate:
          response.targetDate &&
          moment.utc(response.targetDate.toLocaleString()).format("YYYY-MM-DD"),
      });
    };
    fetchData();
  }, [getTodoDetail, username, id]);

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

  const submitHandler = (values) => {
    if (id === "-1" || id === -1) {
      postTodo(username, values);
    } else {
      putTodo(username, id, values);
    }
  };

  const validationHandler = (values) => {
    let error = {};
    if (!values.description) {
      error.description = "Enter Valid values";
    } else if (values.description && values.description.length < 5) {
      error.description = "Enter Valid Description greater than 5 chars";
    }
    if (!moment(values.targetDate).isValid()) {
      error.targetDate = "Enter Valid Date";
    }
    return error;
  };

  return (
    <div>
      {todo && <h1>Edit TODO</h1>}
      {!todo && <h1>Add TODO</h1>}
  
      <div className="container">
        {todo && (
          <FormTodo
            description={todo.description}
            targetDate={todo.targetDate}
            completed={todo.completed}
            submitHandler={submitHandler}
            validationHandler={validationHandler}
          />
        )}

      {!todo && (
          <FormTodo
            submitHandler={submitHandler}
            validationHandler={validationHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
