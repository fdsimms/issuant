import { combineReducers } from "redux";
import {
  SELECT_REPO, INVALIDATE_REPO,
  REQUEST_ISSUES, RECEIVE_ISSUES,
  INCREMENT_CUR_PAGE, DECREMENT_CUR_PAGE,
  UPDATE_LAST_PAGE, ADD_FILTER
} from "./actions";

function selectedRepo(state = "npm/npm", action) {
  switch (action.type) {
  case SELECT_REPO:
    return action.repo;
  default:
    return state;
  }
}

function filters(state = [], action) {
  switch (action.type) {
  case ADD_FILTER:
    var newState = state.slice();
    newState.push(action.filter);
    return newState;
  default:
    return state;
  }
}

function curPage(state = 1, action) {
  switch (action.type) {
  case INCREMENT_CUR_PAGE:
    return state + 1;
  case DECREMENT_CUR_PAGE:
    if (state > 1) {
      return state - 1;
    } else {
      return state;
    }
  default:
    return state;
  }
}

function lastPage(state = -1, action) {
  switch(action.type) {
  case UPDATE_LAST_PAGE:
    return Number(action.lastPage);
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
  curPage,
  lastPage,
  filters
});

export default rootReducer;
