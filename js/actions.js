import fetch from "isomorphic-fetch";

export const REQUEST_ISSUES = "REQUEST_ISSUES";
export const RECEIVE_ISSUES = "RECEIVE_ISSUES";
export const SELECT_REPO = "SELECT_REPO";
export const INVALIDATE_REPO = "INVALIDATE_REPO";
export const INCREMENT_CUR_PAGE = "INCREMENT_CUR_PAGE";
export const DECREMENT_CUR_PAGE = "DECREMENT_CUR_PAGE";
export const UPDATE_LAST_PAGE = "UPDATE_LAST_PAGE";
export const ADD_FILTER = "ADD_FILTER";

export function selectRepo(repo) {
  return {
    type: SELECT_REPO,
    repo
  };
}

export function addFilter(filter) {
  return {
    type:ADD_FILTER,
    filter
  };
}

export function invalidateRepo(repo) {
  return {
    type: INVALIDATE_REPO,
    repo
  };
}

function requestIssues(repo) {
  return {
    type: REQUEST_ISSUES,
    repo
  };
}

function receiveIssues(repo, json) {
  return {
    type: RECEIVE_ISSUES,
    repo,
    issues: json,
    receivedAt: Date.now()
  };
}

export function incrementCurPage() {
  return {
    type: INCREMENT_CUR_PAGE
  };
}

export function decrementCurPage() {
  return {
    type: DECREMENT_CUR_PAGE
  };
}

export function updateLastPage(lastPage) {
  return {
    type: UPDATE_LAST_PAGE,
    lastPage
  };
}

function fetchIssues(state, repo, filters) {
  return dispatch => {
    dispatch(requestIssues(repo));

    let page = "https://api.github.com/repos/" +
               repo + "/issues?page=" + state.curPage + "&" +
               "labels=" + filters.join(",");
    return fetch(page)
      .then(response => {
        let links = response.headers.get("Link");
        if (links) {
          let lastPage = links.match(/.*page=(\d+).*rel="last"/)[1];
          dispatch(updateLastPage(lastPage));
        }
        return response.json();
      }).then(json => dispatch(receiveIssues(repo, json)));
  };
}

function shouldFetchIssues(state, repo) {
  const issues = state.issuesByRepo[repo];
  if (!issues) {
    return true;
  } else if (issues.isFetching) {
    return false;
  } else {
    return issues.didInvalidate;
  }
}

export function fetchIssuesIfNeeded(repo) {
  return (dispatch, getState) => {
    if (shouldFetchIssues(getState(), repo) || getState().filters.length > 0) {
      return dispatch(fetchIssues(getState(), repo, getState().filters));
    }
  };
}
