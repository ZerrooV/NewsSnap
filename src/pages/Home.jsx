import useFetchTopStories from '../hooks/useFetchTopStories';
import NewsLoad from '../components/NewsLoad';
import ErrorAlert from '../components/ErrorAlert';
import TopNews from '../components/TopNews';

function Home() {
  const section = 'home'; 
  const { news, isLoading, error } = useFetchTopStories(section);

  return (
    <>
      <div className="container mt-3">
        <h3 className="text-center">Top Stories - {section.charAt(0).toUpperCase() + section.slice(1)}</h3>
      </div>

      <div className="container mt-3">
        {isLoading ? (
          <NewsLoad count={8} /> 
        ) : error ? (
          <ErrorAlert /> 
        ) : (
          <div className="row">
            {news.map((item, index) => (
              <TopNews
                key={item._id || item.url}
                multimedia={item.multimedia} 
                headline={item.title} 
                byline={item.byline} 
                leadParagraph={item.abstract}
                url={item.url}
                article={{
                    ...item,
                    _id: item.uri || index,
                    headline: item.title,  
                    byline: item.byline,  
                    lead_paragraph: item.abstract,  
                    web_url: item.url 
                  }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
