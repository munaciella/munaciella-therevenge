import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { getArticles } from '../../API/api';
import Error from '../Error/Error';
import CircularProgress from '@mui/material/CircularProgress';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center p-5">
        <CircularProgress />
      </div>
    );
  } else if (isError) {
    return <Error title="404 Article Not Found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {articles.map((article) => {
        return (
          <ArticleCard key={article.article_id} article={article} className="ArticleCard" />
        );
      })}
    </div>
  );
};

export default ArticlesList;