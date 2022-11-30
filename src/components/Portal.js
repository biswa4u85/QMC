import React from "react";
import PropTypes from 'prop-types';
import ReactDom from "react-dom";

const Portal = ({ children, open }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <div
      style={{
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "1000",
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <>{children}</>
    </div>,
    document.getElementById("portal")
  );
};
Portal.propTypes = {
  children: PropTypes.any,
  open: PropTypes.any,
};
export default Portal;