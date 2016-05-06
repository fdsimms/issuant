import React, { PropTypes } from "react";

const Issue = ({ issue, shortenedBody }) => (
  <ul className="issue">
    <li className="issue-title">{issue.title}</li>
    <li className="issue-author">{issue.user.login}</li>
    <li className="issue-body">{shortenedBody}</li>
    <li className="issue-labels">{issue.title}</li>
  </ul>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  shortenedBody: PropTypes.string.isRequired
};

export default Issue;
