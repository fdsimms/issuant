import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Label from "../components/label";
import { addFilter, fetchIssuesIfNeeded } from "../actions";

class LabelContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { dispatch, label, selectedRepo } = this.props;
    dispatch(addFilter(label.name));
    dispatch(fetchIssuesIfNeeded(selectedRepo));
  }

  render() {
    const { label } = this.props;
    return (
      <Label handleClick={this.handleClick} label={label}/>
    );
  }
}

Label.propTypes = { label: PropTypes.object.isRequired };

function mapStateToProps(state) {
  const { selectedRepo } = state;
  return { selectedRepo };
}

export default connect(mapStateToProps)(LabelContainer);
