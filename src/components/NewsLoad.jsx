import PropTypes from 'prop-types';

function NewsLoad({ count = 8 }) {
    return (
      <div className="row">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="col-6 col-sm-4 col-md-3 mb-4">
            <div className="card h-100 placeholder-glow">
              <div className="placeholder ratio ratio-1x1"></div>
              <div className="card-body">
                <h5 className="placeholder col-6"></h5>
                <p className="placeholder col-12"></p>
                <p className="placeholder col-8"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  NewsLoad.propTypes = {
    count: PropTypes.number,
  };

export default NewsLoad;
  