import React, { PropTypes } from "react";
import Issue from "./issue";

const IssuesList = ({ issues }) => (
  <ul className="issues-list">
    { issues.map((issue, i) =>
      <Issue key={i} issue={issue} />
      )
    }
  </ul>
);

IssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default IssuesList;
