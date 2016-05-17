import React, { PropTypes } from "react";

const Labels = ({ labels }) => (
  <ul className="labels">
    { labels.map((label, i) =>
      <li className="label"
          key={i} 
          style={{background: "#" + label.color}}>
        <a href={label.url}>{label.name}</a>
      </li>
    )}
  </ul>
);

Labels.proptypes = {
  labels: PropTypes.object.isRequired
};

export default Labels;
