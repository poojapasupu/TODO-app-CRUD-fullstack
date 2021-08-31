import "./bootstrap.css";
import "./App.css";
import Login from "./components/Login";
import { Route, Redirect, Switch } from "react-router-dom";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import Logout from "./components/Logout";
import AutheticatedRoute from "./components/AutheticatedRoute";
import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <AutheticatedRoute path="/welcome/:name">
          <Welcome />
        </AutheticatedRoute>
        <AutheticatedRoute path='/todos' exact>
          <Todos/>
        </AutheticatedRoute>
        <AutheticatedRoute path='/todos/:id' >
          <TodoItem/>
        </AutheticatedRoute>
        <AutheticatedRoute path='/logout' >
          <Logout/>
        </AutheticatedRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
