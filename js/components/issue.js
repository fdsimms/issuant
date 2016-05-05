import React, { PropTypes } from "react";

const Issue = ({ issue }) => (
  <ul className="issue">
    <li className="issue-title">{issue.title}</li>
    <li className="issue-author">{issue.user.login}</li>
    <li className="issue-labels">{issue.title}</li>
    <li className="issue-body">{issue.body}</li>
  </ul>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired
};

export default Issue;
