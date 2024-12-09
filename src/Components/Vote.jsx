// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { voteArticle } from '../API/api';

const Vote = ({ article_id, votes }) => {
  const [currVotes, setCurrVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(null);
  const [buttonColor, setButtonColor] = useState('default');
  const [error, setError] = useState('');

  const upVote = () => {
    if (hasVoted === null) {
      setHasVoted(1);
      setCurrVotes(currVotes + 1);
      voteArticle(article_id, 1)
        .then((data) => {
          if (data.error) {
            setButtonColor('error');
            setError('Error on voting, please try again.');
          } else {
            setButtonColor('default');
          }
        })
        .catch(() => {
          setButtonColor('error');
          setError('Error on voting, please try again.');
        });
    } else {
      setError('You have already voted.');
    }
  };

  const downVote = () => {
    if (hasVoted === null) {
      setHasVoted(-1);
      setCurrVotes(currVotes - 1);
      voteArticle(article_id, -1)
        .then((data) => {
          if (data.error) {
            setButtonColor('error');
            setError('Error on voting, please try again.');
          } else {
            setButtonColor('default');
          }
        })
        .catch(() => {
          setButtonColor('error');
          setError('Error on voting, please try again.');
        });
    } else {
      setError('You have already voted.');
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {currVotes}
      </p>

      <div className="flex items-center justify-center space-x-6">
        <div
          data-testid="upvote-button"
          onClick={upVote}
          className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-green-500 transition-colors duration-300"
        >
          <ThumbUpIcon className="text-4xl" />
        </div>
        <div
          data-testid="downvote-button"
          onClick={downVote}
          className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-300"
        >
          <ThumbDownIcon className="text-4xl" />
        </div>
      </div>

      {error && (
        <p className={`mt-2 ${error === 'You have already voted.' ? 'text-yellow-500' : 'text-red-500'}`}>
          {error}
        </p>
      )}

      {buttonColor === 'error' && (
        <p className="text-red-500 mt-2">Error on voting, please try again.</p>
      )}
    </div>
  );
};

export default Vote;