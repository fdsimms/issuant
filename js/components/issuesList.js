import React, { PropTypes } from "react";
import IssueContainer from "../containers/issueContainer";

const IssuesList = ({ issues }) => (
  <ul className="issues-list">
    { issues.map((issue, i) =>
      <IssueContainer key={i} issue={issue} />
      )
    }
  </ul>
);

IssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default IssuesList;
