// Added Components
import React, { Component } from "react";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// Our Components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#71913F",
      main: "#71913F",
      dark: "#71913F",
      contrastText: "#fff"
    },
    secondary: {
      light: "#0D5842",
      main: "#0D5842",
      dark: "#0D5842",
      contrastText: "#fff"
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className="grow">
              <NavBar />
              <div className="grow">
                <Switch>
                  <Route exact path="/login" component={LoginForm} />
                  <PrivateRoute exact path="/" component={Home} />
                </Switch>
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
