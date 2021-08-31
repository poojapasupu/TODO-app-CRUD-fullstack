import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

//base64 encoding
const basicAuthTokenGenerator = (username, password) =>
  "Basic " + window.btoa(`${username}:${password}`);

export const basicAuthenticationCall = async (username, password) => {
  return axios.get("http://localhost:8080/basicAuth", {
    headers: {
      Authorization: basicAuthTokenGenerator(username, password),
    },
  });
};

const setupAxiosInterceptors = (username, password) => {
  const interceptorId = axios.interceptors.request.use((config) => {
    config.headers.authorization = basicAuthTokenGenerator(username, password);
    return config;
  });
  return interceptorId;
};

const jwtTokenGenerator = (token) =>
  "Bearer " + token;

export const jwtAuthenticationCall = async (username, password) => {
  return axios.post("http://localhost:8080/authenticate", {
    username,
    password,
  });
};

const setupAxiosInterceptorsJwt = (username, token) => {
  const interceptorId = axios.interceptors.request.use((config) => {
    config.headers.authorization = jwtTokenGenerator(token);
    return config;
  });
  return interceptorId;
};

const initialLoginState = {
  isLoggedIn: false || sessionStorage.getItem("userAuthenticated") !== null,
  username: null || sessionStorage.getItem("userAuthenticated"),
  interceptorId: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      sessionStorage.setItem("userAuthenticated", action.payload.username);
      state.interceptorId = setupAxiosInterceptors(
        action.payload.username,
        action.payload.password
      );
    },
    jwtlogin(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      sessionStorage.setItem("userAuthenticated", action.payload.username);
      state.interceptorId = setupAxiosInterceptorsJwt(
        action.payload.username,
        action.payload.token
      );
    },
    logout(state) {
      state.isLoggedIn = false;
      sessionStorage.removeItem("userAuthenticated");
      axios.interceptors.request.eject(state.interceptorId);
    },
  },
});

const httpInitialState = {
  todos: [],
  error: null,
  status: null,
  notification: null,
};

const httpReqStatusSlice = createSlice({
  name: "httpStatus",
  initialState: httpInitialState,
  reducers: {
    sending(state) {
      state.todos = [];
      state.error = null;
      state.status = "pending";
    },
    error(state, action) {
      state.todos = [];
      state.error = action.payload;
      state.status = "completed";
    },
    success(state, action) {
      state.todos = action.payload;
      state.error = null;
      state.status = "completed";
    },
    updateNotification(state, action) {
      state.notification = action.payload;
    },
    updateStatusSuccess(state) {
      state.status = "completed";
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    http: httpReqStatusSlice.reducer,
  },
});

export const loginActions = loginSlice.actions;
export const httpActions = httpReqStatusSlice.actions;

export default store;
