import React, { PropTypes } from "react";

const Issue = ({ issue, shortenedBody }) => (
  <ul className="issue">
    <li className="issue-title">#{issue.number}: {issue.title}</li>
      <li className="issue-body">{shortenedBody}</li>
    <li className="issue-author-stuff">
      opened by {" "}
      <div className="issue-avatar">
      <img src={issue.user.avatar_url} />
      </div>
      <a href={issue.user.html_url}
         target="_blank"
         className="issue-author">
      {issue.user.login}
      </a>
    </li>
  </ul>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  shortenedBody: PropTypes.string.isRequired
};

export default Issue;
