import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Vote from './Vote'

const ArticleCard = ({ article }) => {
  const { article_id, body, votes, title, topic, article_img_url, author, comment_count, created_at } = article;

  const date = new Date(created_at);

  return (
    <div className="inline-block vertical-align-top w-full sm:w-1/2 lg:w-1/4 mb-5 p-2">
      <Card className="w-full h-full p-4 border border-gray-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 ease-in-out">
        <ul className="p-0">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <h4 className="text-sm text-gray-600 mb-2 capitalize">{topic}</h4>
          <Link to={`/articles/${article_id}`}>
            <img className="max-w-full h-auto rounded-lg mb-2" src={article_img_url} alt="article image" />
          </Link>
          <p className="text-sm mb-2 text-gray-700">Author: {author}</p>
          <p className="text-sm mb-2 text-gray-700">{comment_count} comments</p>
          <Vote article_id={article_id} votes={votes} />
          <p className="text-sm mb-2 text-gray-700">{body}</p>
          <p className="text-xs text-gray-500">
            Created on {date.toLocaleDateString()} at{' '}
            <time>{date.toLocaleTimeString()}</time>
          </p>
        </ul>
      </Card>
    </div>
  );
};

export default ArticleCard;