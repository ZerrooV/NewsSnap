import { useSearchParams } from "react-router-dom";
import useFetchNews from "../hooks/useFetchNews";
import News from "../components/News";
import NewsLoad from "../components/NewsLoad";
import ErrorAlert from "../components/ErrorAlert";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { news, isLoading, error } = useFetchNews(query);

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-3">Search Results for: {query}</h3>
      {isLoading ? (
        <NewsLoad count={8} />
      ) : error ? (
        <ErrorAlert />
      ) : (
        <div className="row">
          {news.map((item) => (
            <News
              key={item._id}
              multimedia={item.multimedia}
              headline={item.headline.main}
              byline={item.byline?.original}
              leadParagraph={item.lead_paragraph}
              url={item.web_url}
              article={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
