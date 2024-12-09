// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Vote from './Vote';

const ArticleCard = ({ article }) => {
  const {
    article_id,
    body,
    votes,
    title,
    topic,
    article_img_url,
    author,
    comment_count,
    created_at,
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date
      .toLocaleDateString(undefined, options)
      .replace(/(\d+)(?=\D)/, (match) => `${match}th`);
  };

  return (
    <Card className="w-full h-full p-4 mt-6 flex flex-col justify-between border border-gray-300 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 hover:border-gray-400 transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:text-white">
      <div>
        <h3
          className="text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
          title={title}
        >
          {title}
        </h3>
        <h4 className="text-md text-gray-600 dark:text-gray-200 mb-2 capitalize">
          {topic}
        </h4>
        <Link to={`/articles/${article_id}`}>
          <img
            className="w-full h-40 object-cover rounded-lg mb-4"
            src={article_img_url}
            alt={`${title} image`}
          />
        </Link>
        <p className="text-md mb-2">{body}</p>
        <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
          Author: {author}
        </p>
        <p className="text-sm mb-2 mt-2 text-gray-700 dark:text-gray-300">
          {comment_count} comments
        </p>
      </div>
      <Vote article_id={article_id} votes={votes} />
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        Created on {formatDate(created_at)}
      </p>
    </Card>
  );
};

export default ArticleCard;
