import useFetchNews from '../hooks/useFetchNews';
import News from '../components/News';
import NewsLoad from '../components/NewsLoad';
import ErrorAlert from '../components/ErrorAlert';

function Programming() {
  const query = 'Tech';
  const { news, isLoading, error } = useFetchNews(query);

  return (
    <>
      <div className="container mt-3">
        <h3 className="text-center">{query} News</h3>
      </div>

      <div className="container mt-3">
        {isLoading ? (
          <NewsLoad count={8} />
        ) : error ? (
          <ErrorAlert />
        ) : (
          <div className="row news-container">
            {news.map((item, index) => (
              <News
                key={item._id}
                multimedia={item.multimedia}
                headline={item.headline.main}
                byline={item.byline?.original}
                leadParagraph={item.lead_paragraph}
                url={item.web_url}
                article={item}
                isFirst={index === 0}
                isLast={index === news.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Programming;
