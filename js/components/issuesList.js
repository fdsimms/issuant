import React, { PropTypes } from "react";

const IssuesList = ({ issues }) => (
  <ul className="issues-list">
    {issues.map((issue, i) =>
      <li className="issue" key={i}>{issue.title}</li>
    )}
  </ul>
);

IssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default IssuesList;
