/* eslint-disable react/prop-types */
import React from "react";
import userImg from "../assets/images/user.jpg";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";
const Blogs = ({ onCreateBlogs, editPost, isEditing }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [titleValid, setTitleValid] = React.useState(true);
  const [contentValid, setContentValid] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    } else {
      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  }, [isEditing, editPost]);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 1 MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      if (!title) {
        setTitleValid(false);
      }
      if (!content) {
        setContentValid(false);
      }
      return;
    }
    const newBlog = {
      image,
      title,
      content,
    };
    console.log(newBlog);
    onCreateBlogs(newBlog, isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate("/");
    }, 1000);
  };
  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
              />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 Character)"
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={60}
            />
            <textarea
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button className="submit-btn" type="submit">
              {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>
        <button className="blogs-close-btn">
          <a href="/">
            Back <i className="bx bx-chevron-right"></i>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
