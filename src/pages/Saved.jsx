import { useSelector } from "react-redux";
import SavedNews from "../components/SavedNews";

function Saved() {
  const savedArticles = useSelector((state) => state.saved);

  return (
    <div className="container mt-3">
      <h3 className="text-center">Saved Articles</h3>

      {savedArticles.length === 0 ? (
        <blockquote className="blockquote text-center"> 
            <p>There`s nothing here, go explore the news and save it for me XD</p>
        </blockquote>
      ) : (
        <div className="row news-container">
            {savedArticles.map((item) => (
              <SavedNews
                key={item._id}
                multimedia={item.multimedia}
                headline={item.headline.main || item.title}
                byline={item.byline?.original || item.byline}
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

export default Saved;
