import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Label from "../components/label";

class LabelContainer extends Component {

  render() {
    const { label } = this.props;
    return (
      <Label label={label}/>
    );
  }
}

Label.propTypes = { label: PropTypes.object.isRequired };

export default connect()(LabelContainer);
