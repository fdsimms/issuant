import React, { PropTypes } from "react";
import IssueContainer from "../containers/issueContainer";

const IssuesList = ({ issues, isFetching }) => (
  <ul className={
    isFetching ? "issues-list fetching" : "issues-list"
  }>
    { issues.length > 0 && issues.map((issue, i) =>
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
