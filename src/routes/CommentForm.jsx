import { postComment } from '../API/api';
import UsernameContext from '../Components/UsernameContext';
import { useContext, useState } from 'react';

const CommentForm = ({ article_id, setComments }) => {
  const [input, setInput] = useState('');
  const { username } = useContext(UsernameContext);
  const [isError, setIsError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input) {
      setDisabled(true);
      postComment(article_id, username, input)
        .then((data) => {
          setComments((currentComments) => [data.comment, ...currentComments]);
          setInput('');
        })
        .catch(() => {
          setIsError('Something went wrong. Please try again.');
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      <form onSubmit={handleSubmit} className="bg-amber-50 p-6 rounded-lg shadow-md">
        <label
          htmlFor="comment"
          className="block font-bold text-gray-700 mb-2"
        >
          Add a Comment
        </label>
        <textarea
          id="comment"
          onChange={handleChange}
          value={input}
          placeholder="Write your comment here"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          required
        />
        <button
          type="submit"
          disabled={disabled}
          className={`w-full mt-4 py-2 px-4 text-white rounded-lg shadow-md ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
          }`}
        >
          {disabled ? 'Submitting...' : 'Submit'}
        </button>
        {isError && (
          <p className="mt-4 text-red-600 font-medium">
            {isError}
          </p>
        )}
      </form>
    </div>
  );
};

export default CommentForm;