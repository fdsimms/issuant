import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Route, Router, IndexRoute, browserHistory } from "react-router";
import Root from "./containers/root";

const routes = (
  <Route path="/" component={Root}>
  </Route>
);

render(
  <Router history={ browserHistory }>{routes}</Router>,
  document.getElementById("root")
);
