import React from "react";
import moment from "moment";
import { useRestCall } from "../api/restApi";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const sorting = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id - quoteB.id;
    } else {
      return quoteB.id - quoteA.id;
    }
  });
};

const TodosList = (props) => {
  const { deleteTodo } = useRestCall();
  const username = useSelector((state) => state.login.username);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // JS constructor method
  const isAscending = queryParams.get("sort") === "asc";

  let sortedArray = sorting(props.todos, isAscending);

  const deleteHandler = (username, id) => {
    deleteTodo(username, id);
  };

  const editHandler = (id) => {
    history.push(`/todos/${id}`);
  };

  const sortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <div className="container">
      {sortedArray && (
        <div className="row">
          <button className="btn btn-success" onClick={sortingHandler}>
            Sort {isAscending ? ": Descending" : ": Ascending"}
          </button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Target Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!!sortedArray &&
            sortedArray.length > 0 &&
            sortedArray.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>
                  {moment
                    .utc(item.targetDate.toLocaleString())
                    .format("YYYY-MM-DD")}
                </td>
                <td>{item.completed.toString()}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={editHandler.bind(null, item.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={deleteHandler.bind(null, username, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodosList;
