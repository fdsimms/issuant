import fetch from "isomorphic-fetch";

export const REQUEST_ISSUES = "REQUEST_ISSUES";
export const RECEIVE_ISSUES = "RECEIVE_ISSUES";
export const SELECT_REPO = "SELECT_REPO";
export const INVALIDATE_REPO = "INVALIDATE_REPO";
export const CHANGE_NEXT_PAGE_LINK = "CHANGE_NEXT_PAGE_LINK";

export function selectRepo(repo) {
  return {
    type: SELECT_REPO,
    repo
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

export function changeNextPageLink(nextPageLink) {
  return {
    type: CHANGE_NEXT_PAGE_LINK,
    nextPageLink
  };
}

function fetchIssues(repo) {
  return dispatch => {
    dispatch(requestIssues(repo));
    return fetch("https://api.github.com/repos/" + repo + "/issues")
      .then(response => {
        let linkHeader = response.headers.get("Link");
        if (linkHeader) {
          let nextPageLink = linkHeader.match(/(https.*)>;\srel="next"/)[1];
          dispatch(changeNextPageLink(nextPageLink));
        }
        return response.json();
      })
      .then(json => dispatch(receiveIssues(repo, json)));
  };
}

export function fetchNextPage(repo, nextPageLink) {
  return dispatch => {
    dispatch(requestIssues(repo));
    return fetch(nextPageLink)
      .then(response => {
        let linkHeader = response.headers.get("Link");
        if (linkHeader) {
          let nextPageLink = linkHeader.match(/(https.*)>;\srel="next"/)[1];
          dispatch(changeNextPageLink(nextPageLink));
        }
        return response.json();
      })
      .then(json => dispatch(receiveIssues(repo, json)));
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
    if (shouldFetchIssues(getState(), repo)) {
      return dispatch(fetchIssues(repo));
    }
  };
}
