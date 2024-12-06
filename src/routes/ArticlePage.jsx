import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../API/api';
import Error from './Error';
import ArticleCard from '../Components//ArticleCard';
import CommentList from '../Components/CommentList';

const ArticlePage = (comment) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ data }) => {
        setArticle(data.article);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <h2 className="text-center text-lg font-semibold">Loading...</h2>;
  else if (isError) return <Error title="404 Article Not Found" />
  
  return  (
    <div className="p-4 md:p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <ArticleCard key={article.article_id} article={article} />
      <CommentList comment={comment} />
    </div>
  );
};

export default ArticlePage;