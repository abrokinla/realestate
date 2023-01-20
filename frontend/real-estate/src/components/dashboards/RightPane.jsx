import React from 'react';
import "../../styles/rightpane.css"

const RightPane = ({ rightPane }) => {
  return (
    <div id="rightpane-container">
      <h1>{rightPane}</h1>
    </div>
  );
}

export default RightPane;
