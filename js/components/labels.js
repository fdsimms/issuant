import React, { PropTypes } from "react";

const Labels = ({ labels }) => (
  <ul className="labels">
    { labels.map((label, i) =>
      <a className="label"
          key={i}
          style={{background: "#" + label.color}}
          href={label.url}>
          {label.name}
      </a>
    )}
  </ul>
);

Labels.proptypes = {
  labels: PropTypes.object.isRequired
};

export default Labels;
