import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchNews(query) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setNews([]);
    setError(null);

    const apiKey = import.meta.env.VITE_NYT_API_KEY;

    axios
      .get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
          q: query,
          'api-key': apiKey,
        },
      })
      .then((response) => {
        setNews(response.data.response.docs);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  return { news, isLoading, error };
}

export default useFetchNews;