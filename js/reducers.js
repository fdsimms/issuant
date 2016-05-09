import { combineReducers } from "redux";
import {
  SELECT_REPO, INVALIDATE_REPO,
  REQUEST_ISSUES, RECEIVE_ISSUES,
  CHANGE_NEXT_PAGE_LINK
} from "./actions";

function selectedRepo(state = "npm/npm", action) {
  switch (action.type) {
  case SELECT_REPO:
    return action.repo;
  default:
    return state;
  }
}

function nextPageLink(state = "", action) {
  switch (action.type) {
  case CHANGE_NEXT_PAGE_LINK:
    return action.nextPageLink;
  default:
    return state;
  }
}

function issues(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_REPO:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_ISSUES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_ISSUES:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.issues,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

function issuesByRepo(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_REPO:
  case RECEIVE_ISSUES:
  case REQUEST_ISSUES:
    return Object.assign({}, state, {
      [action.repo]: issues(state[action.repo], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  issuesByRepo,
  selectedRepo,
  nextPageLink
});

export default rootReducer;
