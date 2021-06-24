import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import UserProvider from "./context/UserProvider";
import SignIn from "./pages/signIn/SignIn";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import CreateSpider from "./pages/CreateSpider";
import CreateEvent from "./pages/CreateEvent";
import "./App.css";
import {
  lime,
  cyan,
  lightBlue,
  lightGreen,
  pink,
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
    },
    secondary: {
      main: lightBlue[300],
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
    <Router>
      <Switch>
        <ThemeProvider theme={mainTheme}>
          <UserProvider>
            <div className="App">
              <Nav />
              <Route path="/" exact>
                <ThemeProvider theme={tagTheme}>
                  <Home />
                </ThemeProvider>
              </Route>
              <Route path="/create-spider">
                <CreateSpider />
              </Route>
              <Route path="/create-event/:id">
                <CreateEvent />
              </Route>
              <Route path="/about/:id">{/* <About /> */}</Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
            </div>
          </UserProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
