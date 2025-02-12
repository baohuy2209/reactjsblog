import React from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/avatar.jpg";
// import techImg from "../assets/images/tech.jpg";
// import sportsImg from "../assets/images/sports.jpg";
// import scienceImg from "../assets/images/science.jpg";
// import worldImg from "../assets/images/world.jpg";
// import healthImg from "../assets/images/health.jpg";
// import nationImg from "../assets/images/nation.jpg";
import axios from "axios";
import NewBoxModal from "./NewBoxModal";
import BookMarks from "./BookMarks";
const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];
const News = () => {
  const [headline, setHeadline] = React.useState(null);
  const [news, setNews] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("general");
  const [searchInput, setSearchInput] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [showBookmarkModel, setShowBookmarkModel] = React.useState(false);
  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmarks) => bookmarks.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      return updatedBookmarks;
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };
  const fetchNews = async (selectedCategory) => {
    const apikey = "49edf7a16072f38adf31dba1be56ea0a";
    let url =
      `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=` +
      apikey;
    if (searchQuery) {
      url =
        `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=us&max=10&apikey=` +
        apikey;
    }
    const response = await axios.get(url);
    const fetchNews = response.data.articles;
    fetchNews.forEach((article) => {
      if (!article.image) {
        article.image =
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fno-image-available&psig=AOvVaw3Sj8YmL8UUVw_qDh6Fh-TZ&ust=1739431338660000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiDk-rMvYsDFQAAAAAdAAAAABAE";
      }
    });
    setHeadline(fetchNews[0]);
    setNews(fetchNews.slice(1, 7));
  };
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };
  React.useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory, searchQuery]);
  return (
    <div className="news">
      <headers className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </headers>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Bao Huy&apos;s Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category, index) => (
                <a
                  href="#"
                  key={index}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div
              className="headline "
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === article.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image} alt={article.title} />
                <h3>
                  {article.title.substring(0, 10)} ...
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(headline);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewBoxModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <BookMarks
          show={showBookmarkModel}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarkModel(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleArticleClick}
        />
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
