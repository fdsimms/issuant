import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Issue from "../components/issue";

class IssueContainer extends Component {
  shortenBody() {
    const { issue } = this.props;
    let issueBody = issue.body;
    return issueBody.split("").slice(0, 139).join("");
  }

  render() {
    const { issue } = this.props;
    return (
      <Issue shortenedBody={this.shortenBody()} issue={issue}/>
    );
  }
}

Issue.propTypes = { issue: PropTypes.object.isRequired };

function mapStateToProps(state) {
  const { selectedRepo, issuesByRepo } = state;
  const {
    isFetching,
    lastUpdated,
    items: issues
  } = issuesByRepo[selectedRepo] || {
    isFetching: true,
    items: []
  };

  return {
    selectedRepo,
    issues,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(IssueContainer);
