import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { httpActions } from "../store/reduxLogic";
import {useHistory} from 'react-router-dom'

const REST_API_URL = "http://localhost:8080/jpa/todos";

//rest api calls hook
export const useRestCall = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  //test call
  const helloWorldCall = async () => {
    try {
      await axios.get("http://localhost:8080/hello");
    } catch (error) {}
  };

  //get todos list call
  const getTodosList = useCallback(
    async (username) => {
      try {
        dispatch(httpActions.sending());
        const response = await axios.get(`${REST_API_URL}/${username}/list`);
        if (response.status !== 200) {
          throw new Error("Could not fetch todos.");
        }
        dispatch(httpActions.success(response.data));
        return response.data;
      } catch (error) {
        dispatch(httpActions.error(error.message || "Something went wrong!"));
      }
    },
    [dispatch]
  );

  //delete todo call
  const deleteTodo = async (username, id) => {
    try {
      dispatch(httpActions.sending());
      const response = await axios.delete(`${REST_API_URL}/${username}/${id}`);
      console.log(response);
      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Could not fetch todos.");
      }
      getTodosList(username); // refresh todos
      dispatch(httpActions.updateNotification("Todo Deleted!"));
      return response.data;
    } catch (error) {
      dispatch(httpActions.error(error.message || "Something went wrong!"));
    }
    return null;
  };

  //get todo detail call
  const getTodoDetail = useCallback(async (username, id) => {
    try {
      dispatch(httpActions.sending());
      const response = await axios.get(
        `${REST_API_URL}/${username}/${id}`
      );

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Could not fetch the todo detail.");
      }
      dispatch(httpActions.updateStatusSuccess());
      return response.data;
    } catch (error) {
      dispatch(httpActions.error(error.message || "Something went wrong!"));
    }
  }, [dispatch]);


  //update todo call
  const putTodo = async (username, id, values) => {
    try {
      dispatch(httpActions.sending());
      const todo = {username, id, description: values.description, targetDate : values.targetDate, completed: values.completed};
      const response = await axios.put(`${REST_API_URL}/${username}/${id}`, todo);

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Could not Edit the todo");
      }
      dispatch(httpActions.updateStatusSuccess());
      history.replace('/todos');
    } catch (error) {
      dispatch(httpActions.error(error.message || "Something went wrong!"));
    }
    return null;
  };

  //create todo call
  const postTodo = async (username, values) => {
    try {
      dispatch(httpActions.sending());
      const todo = {username, description: values.description, targetDate : values.targetDate, completed: values.completed};
      const response = await axios.post(`${REST_API_URL}/${username}/newTodo`, todo);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Could not add the todo");
      }
      dispatch(httpActions.updateStatusSuccess());
      history.replace('/todos');
    } catch (error) {
      dispatch(httpActions.error(error.message || "Something went wrong!"));
    }
    return null;
  };

  return { helloWorldCall, getTodosList, deleteTodo, getTodoDetail, putTodo, postTodo};
};
