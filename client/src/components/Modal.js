import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

// const MODAL_STYLE = {
//   position: "fixed",
//   top: "20%",
//   left: "20%",
//   right: "20%",
//   bottom: "20%",
//   backgroundColor: "#758283",
//   // padding: "50px",
//   zIndex: 1000,
//   overflow: "auto", // Add this line to enable scrolling when content exceeds the dimensions
// };

// const OVERLAY_STYLES = {
//   position: "fixed",
//   border: "10px solid #ccc",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0,0,0,0.7)",
//   zIndex: 1000,
//   overflow: "auto",
// };

export default function Modal({ open, children }) {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="outer-container" ></div>
      <div className="ineer-container" >
        {/* <button onClick={onclose}>close Modal</button> */}
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
