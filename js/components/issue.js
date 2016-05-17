import React, { PropTypes } from "react";

const Issue = ({ issue, shortenedBody }) => (
  <ul className="issue">
    <li className="issue-top-bar">
      <div className="issue-author-stuff">
        <div className="issue-avatar">
          <img src={issue.user.avatar_url} />
        </div>
      </div>
      <div className="issue-title">#{issue.number}: {issue.title}</div>
    </li>
    <div className="issue-author">
    <a href={issue.user.html_url} target="_blank">
    {issue.user.login}
    </a>
    </div>
    <div className="issue-content">
      <li className="issue-body">{shortenedBody}</li>
    </div>
  </ul>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  shortenedBody: PropTypes.string.isRequired
};

export default Issue;
