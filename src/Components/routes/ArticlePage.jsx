import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../API/api';
import CommentList from '../CommentList';
import Error from '../Error/Error';

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
    <div className="p-4 md:p-6 max-w-4xl mx-auto my-8 border rounded-xl shadow-lg bg-white">
      <ArticleCard key={article.article_id} article={article} />
      <CommentList comment={comment} />
    </div>
  );
};

export default ArticlePage;