import React, { PropTypes } from "react";
import Labels from "./labels";

const Issue = ({ issue, shortenedBody }) => (
  <ul className="issue">
    <li className="title-and-labels">
      <div className="issue-title">#{issue.number}: {issue.title}</div>
      <Labels labels={issue.labels} />
    </li>
    <li className="issue-body">{shortenedBody}</li>
    <li className="issue-author-stuff">
      opened by {" "}
      <a href={issue.user.html_url} className="issue-avatar">
      <img src={issue.user.avatar_url} />
      </a>
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
