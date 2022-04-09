import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages";
import { ThemeProvider } from "./theme";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
