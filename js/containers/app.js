import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selectRepo,
         fetchIssuesIfNeeded,
         invalidateRepo,
         updateLastPage,
         incrementCurPage,
         decrementCurPage } from "../actions";
import IssuesList from "../components/issuesList";
import Header from "../components/header";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
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

    if (nextProps.lastPage !== this.props.lastPage) {
      const { lastPage } = nextProps;
      dispatch(updateLastPage(lastPage));
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

    const { dispatch, selectedRepo, curPage } = this.props;
    dispatch(incrementCurPage());
    dispatch(fetchIssuesIfNeeded(selectedRepo));
  }

  handlePrevPageClick(e) {
    e.preventDefault();

    const { dispatch, selectedRepo, curPage } = this.props;
    if (curPage > 1) {
      dispatch(decrementCurPage());
      dispatch(fetchIssuesIfNeeded(selectedRepo));
    }
  }

  render() {
    const { issues, isFetching, lastUpdated, lastPage, curPage } = this.props;
    return (
      <div className="app">
      <Header />
        <main className="main">
          <div className="main-top-bar group">
            {lastUpdated &&
            <div className="last-updated">
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {" "}
            </div>
            }
            {!isFetching && curPage > 1 &&
              <button className="prev-page-button button" href="#"
              onClick={this.handlePrevPageClick}>
              prev
              </button>
            }
            {!isFetching &&
              <button className="refresh-button button" href="#"
                 onClick={this.handleRefreshClick}>
                Refresh
              </button>
            }
            {!isFetching && curPage !== lastPage &&
              <button className="next-page-button button" href="#"
                 onClick={this.handleNextPageClick}>
                next
              </button>
            }
          </div>
          {isFetching && issues.length === 0 &&
            <h2 className="loading">Loading...</h2>
          }
          {!isFetching && issues.length === 0 &&
            <h2 className="empty">Empty.</h2>
          }
          <IssuesList curPage={curPage} issues={issues} isFetching={isFetching} />
          </main>
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
  curPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  const { selectedRepo, issuesByRepo, curPage, lastPage } = state;
  const {
    isFetching,
    lastUpdated,
    itemsByPage: issues
  } = issuesByRepo[selectedRepo] || {
    isFetching: true,
    itemsByPage: []
  };

  return {
    selectedRepo,
    issues,
    isFetching,
    lastUpdated,
    curPage,
    lastPage
  };
}

export default connect(mapStateToProps)(App);
