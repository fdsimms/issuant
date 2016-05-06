import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Issue from "../components/issue";

function shortenTo140Chars(str) {
  let splitStr = str.split(" ");
  let result = [];
  let curLength = 0;
  let idx = 0;
  while (curLength <= 140 && idx < splitStr.length) {
    let word = splitStr[idx];

    if (curLength + word.length > 140) {
      break;
    }

    result.push(word);
    curLength += word.length;
    if (idx < splitStr.length - 1 && curLength + 1 <= 140) {
      curLength += 1; // account for added space when not last word
    }

    idx += 1;
  }

  return result.join(" ");
}

class IssueContainer extends Component {
  shortenBody() {
    const { issue } = this.props;
    return shortenTo140Chars(issue.body);
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
