import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import Create from "./pages/Create";
import "./App.css";
import { lime, cyan } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: cyan[400],
    },
    secondary: {
      // This is green.A700 as hex.
      main: lime["A400"],
      contrastText: cyan[600],
    },
  },
});

function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Nav />
            <Route path="/" exact>
              <Home />
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
