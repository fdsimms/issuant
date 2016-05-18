import React, { PropTypes } from "react";
import LabelContainer from "../containers/labelContainer";

const Labels = ({ labels }) => (
  <ul className="labels">
    { labels.map((label, i) =>
      <LabelContainer key={i} label={label} />
    )}
  </ul>
);

Labels.propTypes = {
  labels: PropTypes.array.isRequired
};

export default Labels;
