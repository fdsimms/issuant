import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from "../components/header";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App)
