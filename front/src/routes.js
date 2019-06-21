import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './pages/HomePage'

const routes = (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default routes;
