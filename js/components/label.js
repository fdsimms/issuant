import React, { PropTypes } from "react";

const Label = ({ label, handleClick }) => (
  <button className="label"
          onClick={handleClick}
          style={{background: "#" + label.color}}
          href={label.url}>
    {label.name}
  </button>
);

Label.propTypes = {
  label: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Label;
