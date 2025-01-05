import PropTypes from "prop-types";

function HotNews({ hotNews, isLoading, error }) {
    if (isLoading) {
      return <p>Loading hot news...</p>;
    }
    if (error) {
      return <p>Error loading hot news: {error.message}</p>;
    }
    if (!hotNews || hotNews.length === 0) {
      return <p>No hot news available</p>;
    }

    return (
      <div id="carouselExampleCaptions" className="carousel slide custom-carousel">
        <div className="carousel-indicators">
          {hotNews.map((_, index) => (
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : ''}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>
        <div className="carousel-inner shadow rounded">
          {hotNews.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={item.id || index}
            >
            <a href={item.url}>
                <img
                    src={
                        item.media?.[0]?.['media-metadata']?.find(meta => meta.format === 'mediumThreeByTwo440')?.url ||
                        'placeholder.jpg'
                    }
                    className="d-block w-100"
                    alt={item.title}
                />
            </a>
              <div className="carousel-caption">
                <h5>{item.title}</h5>
                <p>{item.abstract}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }

  HotNews.propTypes = {
    hotNews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        media: PropTypes.arrayOf(
          PropTypes.shape({
            'media-metadata': PropTypes.arrayOf(
              PropTypes.shape({
                url: PropTypes.string.isRequired,
              })
            ),
          })
        ),
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string,
      })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  };
  
  export default HotNews;