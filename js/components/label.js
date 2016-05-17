import React, { PropTypes } from "react";

const Label = ({ label }) => (
  <a className="label"
      style={{background: "#" + label.color}}
      href={label.url}>
      {label.name}
  </a>
);

Label.propTypes = {
  label: PropTypes.object.isRequired
};

export default Label;
