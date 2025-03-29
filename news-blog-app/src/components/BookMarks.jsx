import React from "react";
import "./Modal.css";
import "./Bookmark.css";
const BookMarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        <h2 className="bookmark-heading">Bookmarked News</h2>
        <div className="bookmarks-list">
          {bookmarks.map((bookmark, index) => (
            <div className="bookmarks-item" key={index}>
              <img src={bookmark.image} alt={bookmark.title} />
              <h3>{bookmark.title}</h3>
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(bookmark);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
