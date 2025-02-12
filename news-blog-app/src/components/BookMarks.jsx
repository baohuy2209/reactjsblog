import React from "react";
import "./Modal.css";
import "./Bookmark.css";
const BookMarks = ({ show, bookmarks, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2>Bookmarked News</h2>
        <div className="bookmarks-list">
          <div className="bookmarks-item">
            <img src="" alt="Bookmark Image" />
            <h3>Lorem ipsum dolor sit amet.</h3>
            <span className="delete-button" onClick={onClose}>
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
