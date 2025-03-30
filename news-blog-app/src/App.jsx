import News from "./components/News";
import React from "react";
import Blogs from "./components/Blogs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
function App() {
  const [blogs, setBlogs] = React.useState([]);
  const [selectPosted, setSelectPosted] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEditing
        ? prevBlogs.map((blog) => (blog === selectPosted ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectPosted(null);
  };
  const handleEditBlog = (blog) => {
    setSelectPosted(blog);
    setIsEditing(true);
  };
  const handleDeleteBlog = (deletedBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== deletedBlog);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };
  React.useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);
  return (
    <div className="container">
      <div className="news-blog-app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <News
                  blogs={blogs}
                  onEditBlog={handleEditBlog}
                  onDeleteBlog={handleDeleteBlog}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <Blogs
                  onCreateBlogs={handleCreateBlog}
                  editPost={selectPosted}
                  isEditing={isEditing}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
