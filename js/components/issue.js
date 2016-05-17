import React, { PropTypes } from "react";

const Issue = ({ issue, shortenedBody }) => (
  <ul className="issue">
    <div className="issue-author-stuff">
      <li className="issue-avatar">
        <img src={issue.user.avatar_url} />
      </li>
      <li className="issue-author">
        <a href={issue.user.html_url} target="_blank">
          {issue.user.login}
        </a>
      </li>
    </div>
    <div className="issue-content">
      <li className="issue-title">#{issue.number}: {issue.title}</li>
      <li className="issue-body">{shortenedBody}</li>
    </div>
  </ul>
);

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  shortenedBody: PropTypes.string.isRequired
};

export default Issue;
