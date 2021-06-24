import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import Create from "./pages/Create";
import "./App.css";
import { lime, cyan, red, lightBlue, green } from "@material-ui/core/colors";

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
      main: red[400],
      molt: green[500],
      contrastText: "#fff",
    },
    secondary: {
      main: lightBlue[500],
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
          <div className="App">
            <Nav />
            <Route path="/" exact>
              <ThemeProvider theme={tagTheme}>
                <Home />
              </ThemeProvider>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </div>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
