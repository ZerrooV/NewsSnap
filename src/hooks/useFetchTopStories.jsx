import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchTopStories(section) {
  const [news, setNews] = useState([]);       
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    setIsLoading(true);
    setNews([]);
    setError(null);

    const apiKey = import.meta.env.VITE_NYT_API_KEY; 

    axios
      .get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
        params: {
          'api-key': apiKey,
        },
      })
      .then((response) => {
        setNews(response.data.results);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [section]);

  return { news, isLoading, error };
}

export default useFetchTopStories;
