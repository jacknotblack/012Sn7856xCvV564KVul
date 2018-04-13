import React from "react";
import { PropTypes } from "prop-types";

const TestHeader = ({ children }) => (
  <div>
    <div>THIS IS HEADER</div>
    {children}
  </div>
);

TestHeader.propTypes = {
  children: PropTypes.element.isRequired
};

export default TestHeader;
