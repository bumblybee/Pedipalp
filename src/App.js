import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./utils/customHistory";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import UserProvider from "./context/UserProvider";
import NotificationProvider from "./context/notification/NotificationProvider";
import Notification from "./components/notification/Notification";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SignIn from "./pages/signIn/SignIn";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateSpider from "./pages/CreateSpider";
import EditSpider from "./pages/EditSpider";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import "./App.css";
import {
  lime,
  cyan,
  lightBlue,
  lightGreen,
  pink,
  red,
} from "@material-ui/core/colors";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[400],
    },
    secondary: {
      main: lime["A400"],
      contrastText: cyan[600],
    },
  },
});

const tagTheme = createMuiTheme({
  palette: {
    primary: {
      main: pink[300],
      molt: lightGreen[400],
      contrastText: "#fff",
      trash: red["A400"],
    },
    secondary: {
      main: lightBlue[400],
      light: lime[300],
      contrastText: "#fff",
    },
    neutral: {
      main: lime[600],
    },
  },
});

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={mainTheme}>
        <UserProvider>
          <NotificationProvider>
            <div className="App">
              <Nav />
              <Switch>
                <ProtectedRoute path="/" exact>
                  <ThemeProvider theme={tagTheme}>
                    <Home />
                  </ThemeProvider>
                </ProtectedRoute>
                <ProtectedRoute path="/create-spider" exact>
                  <CreateSpider />
                </ProtectedRoute>
                <ProtectedRoute path="/edit-spider/:id" exact>
                  <EditSpider />
                </ProtectedRoute>
                <ProtectedRoute path="/create-event/:id" exact>
                  <CreateEvent />
                </ProtectedRoute>
                <ProtectedRoute path="/edit-event/:id" exact>
                  <EditEvent />
                </ProtectedRoute>
                <ProtectedRoute path="/about/:id" exact>
                  <About />
                </ProtectedRoute>
                <Route path="/sign-in">
                  <SignIn />
                </Route>
              </Switch>
            </div>
          </NotificationProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
