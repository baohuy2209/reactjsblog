/* eslint-disable react/prop-types */
import "./NewBoxModal.css";
import "./Modal.css";
const NewBoxModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="modal-image"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">
              Source:{" "}
              <a className="modal-source-link" href={article.source.url}>
                {article.source.name}
              </a>
            </p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
              })}
            </p>
            <p className="modal-content-text">{article.description}</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={article.url}
              className="read-more-link"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewBoxModal;
