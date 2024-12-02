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
      }, 2000);
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
      }, 2000);
      voteArticle(article_id, -1).then((data) => {
        if (data.error) {
          setButtonColor('error');
        }
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <p className="text-lg mr-4">Votes: {currVotes}</p>
        <div
          onClick={upVote}
          className="flex items-center justify-center cursor-pointer bg-pink-500 text-white rounded-full px-2 py-1 transition-colors duration-300 hover:bg-pink-600"
        >
          <ThumbUpIcon />
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div
          onClick={downVote}
          className="flex items-center justify-center cursor-pointer bg-pink-500 text-white rounded-full px-2 py-1 transition-colors duration-300 hover:bg-pink-600"
        >
          <ThumbDownIcon />
        </div>
      </div>
      {buttonColor === 'error' && (
        <p className="text-red-500 text-center mt-2">
          Error on voting, please try again.
        </p>
      )}
    </>
  );
};

export default Vote;