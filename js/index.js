import React from "react";
import ReactDOM from "react-dom";
import IssuesList from "./components/issuesList";
import { Provider } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import configureStore from "./configureStore.js";
import App from "./containers/app";

const store = configureStore();

const routes = (
  <Route path="/" component={App} />
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById("root")
);
