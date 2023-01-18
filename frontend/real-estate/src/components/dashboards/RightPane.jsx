import React from "react";
import "../../styles/rightpane.css"
import { connect } from 'react-redux';

const RightPane = ({ rightPane }) => {
  return (  
    <div>
        {rightPane}
    </div>
  );
}

const mapStateToProps = state => {
    return { rightPane: state.rightPane };
};

export default connect(mapStateToProps)(RightPane);