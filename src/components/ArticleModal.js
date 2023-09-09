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
        <div className="modal-box">
          <div>{articles[modalId].title}</div>
          <div>{articles[modalId].description}</div>
          <div>{articles[modalId].publishedAt}</div>
          <div>{articles[modalId].author}</div>
          <div><img src={articles[modalId].urlToImage} alt="articleimage" /></div>
          <div>{articles[modalId].content}</div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

export default ArticleModal;
