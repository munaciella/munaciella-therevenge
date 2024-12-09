// eslint-disable-next-line no-unused-vars
import React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from 'react';
import { voteArticle } from '../API/api';

const Vote = ({ article_id, votes }) => {
  const [currVotes, setCurrVotes] = useState(votes);
  const [timesClicked, setTimesClicked] = useState(0);
  const [buttonColor, setButtonColor] = useState('default');

  const upVote = () => {
    if (timesClicked <= 0) {
      setTimesClicked(timesClicked + 1);
      setTimeout(() => {
        setCurrVotes(currVotes + 1);
      }, 1000);
      voteArticle(article_id, 1).then((data) => {
        if (data.error) {
          setButtonColor('error');
        }
      });
    }
  };

  const downVote = () => {
    if (timesClicked >= 0) {
      setTimesClicked(timesClicked - 1);
      setTimeout(() => {
        setCurrVotes(currVotes - 1);
      }, 1000);
      voteArticle(article_id, -1).then((data) => {
        if (data.error) {
          setButtonColor('error');
        }
      });
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {currVotes}
      </p>
      
      <div className="flex items-center justify-center space-x-6">
        <div
          onClick={upVote}
          className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-green-500 transition-colors duration-300"
        >
          <ThumbUpIcon className="text-4xl" />
        </div>
        <div
          onClick={downVote}
          className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-300"
        >
          <ThumbDownIcon className="text-4xl" />
        </div>
      </div>

      {buttonColor === 'error' && (
        <p className="text-red-500 mt-2">
          Error on voting, please try again.
        </p>
      )}
    </div>
  );
};

export default Vote;
