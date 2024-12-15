import { useDispatch, useSelector } from "react-redux";
import { saveArticle, removeArticle } from "../redux/slices/savedSlice";
import PropTypes from 'prop-types';

function TopNews({ multimedia, headline, byline, leadParagraph, url, article }) {
    const dispatch = useDispatch();
    const savedArticles = useSelector((state) => state.saved);
  
    const handleSave = () => {
        if (!article._id) {
          console.error("Article missing _id:", article);
          return;
        }
      
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

    const formatByline = (text, maxWords) => {
      const words = text.split(' ');
      return words.length > maxWords
        ? words.slice(0, maxWords).join(' ') + 'et al'
        : text;
    };
  
    const imageUrl = multimedia?.length
      ? multimedia.find(media => media.format === 'Super Jumbo')?.url || multimedia[0].url
      : 'https://via.placeholder.com/150';
  
      return (
        <>  
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
                  {byline && <p className="text-muted small mb-2">{formatByline(byline,3)}</p>}
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
        </>
      );
  }
  
  TopNews.propTypes = {
    isLast: PropTypes.bool,
    multimedia: PropTypes.array,
    headline: PropTypes.string.isRequired,
    byline: PropTypes.string,
    leadParagraph: PropTypes.string,
    url: PropTypes.string.isRequired,
    article: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  export default TopNews;
  