import useFetchTopStories from '../hooks/useFetchTopStories';
import NewsLoad from '../components/NewsLoad';
import ErrorAlert from '../components/ErrorAlert';
import TopNews from '../components/TopNews';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import useFetchHotNews from '../hooks/useFetchHotNews';
import HotNews from '../components/HotNews';

function Home() {
  const section = 'home'; 
  const { news, isLoading, error } = useFetchTopStories(section);
  const { news: hotNews, isLoading: isHotLoading, error: hotError } = useFetchHotNews(7);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  return (
    <>
      <div className="container mt-3 mb-3">
        <HotNews hotNews={hotNews} isLoading={isHotLoading} error={hotError} />
      </div>

      <div className="container mt-3">
        <h3 className="text-center">Top Stories - {section.charAt(0).toUpperCase() + section.slice(1)}</h3>
      </div>

      <div className="container mt-4">
        {isLoading ? (
          <NewsLoad count={8} /> 
        ) : error ? (
          <ErrorAlert /> 
        ) : (
          <>
            <div className="row">
              {currentItems.map((item, index) => (
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
