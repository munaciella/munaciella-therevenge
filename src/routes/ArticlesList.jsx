// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import ArticleCard from '../Components/ArticleCard';
import { getArticles } from '../API/api';
import Error from './Error';
import CircularProgress from '@mui/material/CircularProgress';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All topics');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((response) => {
        const allArticles = response.data.articles;
        setArticles(allArticles);
        setFilteredArticles(allArticles);
        const uniqueTopics = [
          'All topics',
          ...new Set(allArticles.map((article) => article.topic)),
        ];
        setTopics(uniqueTopics);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    setVisibleCount(12);

    if (topic === 'All topics') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.topic === topic)
      );
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

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
    <div className="p-6">
      <div className="mb-6 flex justify-center">
        <select
          value={selectedTopic}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-400 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none relative"
        >
          {topics.map((topic) => (
            <option
              key={topic}
              value={topic}
              className="text-base hover:font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xs:gap-12">
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      {visibleCount < filteredArticles.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 mt-8 bg-redditOrange text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Show More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
