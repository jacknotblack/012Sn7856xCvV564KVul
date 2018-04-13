import React from "react";
import { PropTypes } from "prop-types";

const mobileStyles = {
  width: "400px",
  height: "700px",
  border: "solid 1px rgba(170,170,170,1)",
  boxShadow: "1px 2px 3px 0px rgba(170,170,170,1)",
  position: "relative",
  overflow: "auto"
};
const MobileWrapper = ({ children }) => (
  <div style={mobileStyles}>{children}</div>
);

MobileWrapper.propTypes = {
  children: PropTypes.element.isRequired
};

export default MobileWrapper;
