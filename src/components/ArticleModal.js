import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ArticleModal = ({ articles, modalId, isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {ReactDOM.createPortal(
        <div className="backdrop" onClick={closeModal}></div>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className="modal-box">{articles[modalId].title}</div>,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

export default ArticleModal;
