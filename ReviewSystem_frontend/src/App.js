import React from "react";
import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import Secret from "./Components/Secret";
import Home from "./Components/Home/Home";
import AddReview from "./Components/AddReview";
import SubjectTitle from "./Components/Home/SubjectTitle";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import store from "./redux/store";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();
  return (
    <Provider store={store}>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route path="/home" component={Home} />
              <PublicRoute path="/register" component={RegistrationForm} />
              <PublicRoute path="/login" component={LoginForm} />
              <PrivateRoute path="/secret" component={Secret} />
              <PrivateRoute path="/addreview" component={AddReview} />
              <Route path="/sub" exact component={SubjectTitle} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
