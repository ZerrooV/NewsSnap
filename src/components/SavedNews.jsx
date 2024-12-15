import { useDispatch, useSelector } from "react-redux";
import { saveArticle, removeArticle } from "../redux/slices/savedSlice";
import PropTypes from 'prop-types';

function SavedNews({ multimedia, headline, byline, leadParagraph, url, article}) {
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
  ? multimedia.find(media => media.format === 'Super Jumbo')?.url || `https://www.nytimes.com/${multimedia[0].url}`
  : 'https://via.placeholder.com/150';

  return (
    <div className="col-12 mb-4">
      <div className="card h-20 shadow special-card">
        <div className="special-card-content">
          <img src={imageUrl} alt={headline} className="special-card-img rounded" />
          <div className="special-card-body ms-3">
            <h5 className="card-title">{headline}</h5>
            <p className="card-text">{truncateText(leadParagraph, 70)}</p>
            {byline && <p className="text-muted small mb-2">{byline}</p>}
            <div className="d-flex justify-content-end mt-2">
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
  );
}

SavedNews.propTypes = {
  multimedia: PropTypes.array,
  headline: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  byline: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  leadParagraph: PropTypes.string,
  url: PropTypes.string.isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SavedNews;
