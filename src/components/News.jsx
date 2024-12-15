import { useDispatch, useSelector } from "react-redux";
import { saveArticle, removeArticle } from "../redux/slices/savedSlice";
import PropTypes from 'prop-types';

function News({ multimedia, headline, byline, leadParagraph, url, article, isFirst, isLast }) {
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.saved);

  const handleSave = () => {
    const isSaved = savedArticles.some((saved) => saved._id === article._id);
    if (isSaved) {
      dispatch(removeArticle(article));
    } else {
      dispatch(saveArticle(article));
    }
  };

  const isSaved = savedArticles.some((saved) => saved._id === article._id);

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : text;
  };

  const imageUrl = multimedia?.length
    ? `https://www.nytimes.com/${multimedia[0].url}`
    : 'https://via.placeholder.com/150';

   return (
    <>
      {isFirst || isLast ? (
        <div className="col-12 mb-4">
          <div className="card h-20 shadow special-card">
            <div className="special-card-content">
              <img src={imageUrl} alt={headline} className="special-card-img rounded" />
              <div className="special-card-body ms-3">
                <h5 className="card-title">{headline}</h5>
                <p className="card-text">{truncateText(leadParagraph, 70)}</p>
                {byline && <p className="text-muted small mb-2">{byline}</p>}
                <div className="d-flex gap-10 mt-auto justify-content-end">
                  <a href={url} className="btn btn-info me-2" target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                  <button
                    className={`btn ${isSaved ? "btn-success" : "btn-primary"}`}
                    onClick={handleSave}
                  >
                    {isSaved ? "Unsave" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-6 col-sm-4 col-md-3 col-lg-5-cols mb-4 news-item">
          <div className="card h-100 shadow">
            <div className="ratio ratio-1x1" style={{ position: "relative" }}>
              <img src={imageUrl} className="card-img-top rounded" alt={headline} style={{ objectFit: "cover" }} />
                <button
                  className={`save-icon btn ${isSaved ? "btn-success" : "btn-light"}`}
                  onClick={handleSave}
                  title={isSaved ? "Unsave" : "Save"}
                >
                <i className={`bx ${isSaved ? "bx-bookmark" : "bx-bookmark-plus"}`}></i>
                </button>
            </div>

            <div className="card-body d-flex flex-column">
              {byline && <p className="text-muted small mb-2">{byline}</p>}
              <h5 className="card-title">{headline}</h5>
              <p className="card-text">{truncateText(leadParagraph, 20)}</p>
              <div className="button">
                <a href={url} className="btn btn-info w-100 me-2" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

News.propTypes = {
  isFirst: PropTypes.number,
  isLast: PropTypes.number,
  multimedia: PropTypes.array,
  headline: PropTypes.string.isRequired,
  byline: PropTypes.string,
  leadParagraph: PropTypes.string,
  url: PropTypes.string.isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default News;