import React from "react";
import "./BlogModal.css";
const BlogModal = ({ showBlogModal, selectedPost, onClose }) => {
  if (!showBlogModal) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img
          src={selectedPost.image}
          alt="Modal Image"
          className="blog-modal-image"
        />
        <h2 className="blog-modal-title">{selectedPost.title}</h2>
        <p className="blog-post-content">{selectedPost.content}</p>
      </div>
    </div>
  );
};

export default BlogModal;
