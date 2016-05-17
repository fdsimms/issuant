import React, { PropTypes } from "react";
import IssueContainer from "../containers/issueContainer";

const IssuesList = ({ issues, isFetching, curPage }) => (
  <ul className={
    isFetching ? "issues-list fetching" : "issues-list"
  }>
    { issues[curPage] && issues[curPage].length > 0 &&
      issues[curPage].map((issue, i) =>
      <IssueContainer key={i} issue={issue} />
      )
    }
  </ul>
);

IssuesList.propTypes = {
  issues: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default IssuesList;
