import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectRepo, fetchIssuesIfNeeded, invalidateRepo, fetchNextPage, changeNextPageLink } from "../actions";
import IssuesList from "../components/issuesList";
import Header from "../components/header";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedRepo } = this.props;
    dispatch(fetchIssuesIfNeeded(selectedRepo));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if (nextProps.selectedRepo !== this.props.selectedRepo) {
      const { selectedRepo } = nextProps;
      dispatch(fetchIssuesIfNeeded(selectedRepo));
    }

    if (nextProps.nextPageLink !== this.props.nextPageLink) {
      const { nextPageLink } = nextProps;
      dispatch(changeNextPageLink(nextPageLink));
    }
  }

  handleChange(nextRepo) {
    this.props.dispatch(selectRepo(nextRepo));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedRepo, nextPageLink } = this.props;
    dispatch(invalidateRepo(selectedRepo));
    dispatch(fetchIssuesIfNeeded(selectedRepo));
  }

  handleNextPageClick(e) {
    e.preventDefault();

    const { dispatch, selectedRepo, nextPageLink } = this.props;
    dispatch(invalidateRepo(selectedRepo));
    dispatch(fetchNextPage(selectedRepo, nextPageLink));
  }

  render() {
    const { selectedRepo, issues, isFetching, lastUpdated } = this.props;
    return (
      <div>
      <Header />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {" "}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleNextPageClick}>
              >
            </a>
          }
        </p>
        {isFetching && issues.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && issues.length === 0 &&
          <h2>Empty.</h2>
        }
        {issues.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <IssuesList issues={issues} />
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  selectedRepo: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  nextPageLink: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { selectedRepo, issuesByRepo, nextPageLink } = state;
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
    lastUpdated,
    nextPageLink
  };
}

export default connect(mapStateToProps)(App);
