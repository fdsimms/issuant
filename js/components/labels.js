import React, { PropTypes } from "react";
import LabelContainer from "../containers/labelContainer";

const Labels = ({ labels }) => (
  <ul className="labels">
    { labels.map((label, i) =>
      <LabelContainer key={i} label={label} />
    )}
  </ul>
);

Labels.proptypes = {
  labels: PropTypes.object.isRequired
};

export default Labels;
