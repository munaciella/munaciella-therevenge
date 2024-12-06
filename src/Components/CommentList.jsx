import { useEffect, useState, useContext } from 'react';
import { getComments, deleteComment, postComment } from '../API/api';
import { useParams } from 'react-router-dom';
import UsernameContext from '../Components/UsernameContext';

const CommentList = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const { username } = useContext(UsernameContext);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      setDisabled(true);
      postComment(article_id, username, input)
        .then((data) => {
          setComments((currentComments) => [data.comment, ...currentComments]);
          setInput('');
          setMessage('Comment added successfully!');
        })
        .catch(() => {
          setIsError(true);
          setMessage('Failed to add comment. Please try again.');
        })
        .finally(() => {
          setDisabled(false);
          setTimeout(() => setMessage(''), 3000);
        });
    }
  };

  const handleDelete = (comment_id) => {
    setDisabled(true);
    deleteComment(comment_id)
      .then(() => {
        const newComments = comments.filter(
          (comment) => comment.comment_id !== comment_id
        );
        setComments(newComments);
        setMessage('Comment deleted successfully.');
      })
      .catch(() => {
        setIsError(true);
        setMessage('Failed to delete comment. Please try again.');
      })
      .finally(() => {
        setDisabled(false);
        setTimeout(() => setMessage(''), 3000);
      });
  };

  if (isLoading) return <h2>Loading comments...</h2>;
  if (isError) return <h2>Something went wrong. Please try again later.</h2>;

  return (
    <section className="mt-8 space-y-6">

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border"
      >
        <label
          htmlFor="comment"
          className="block text-md font-medium text-gray-800 dark:text-gray-200"
        >
          Add a Comment
        </label>
        <textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full resize-none rounded-lg border bg-gray-50 dark:bg-gray-900 p-3 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-redditOrange focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={disabled}
          className={`w-full rounded-lg px-4 py-2 text-white ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {disabled ? 'Submitting...' : 'Submit'}
        </button>
        {isError && (
          <p className="text-sm font-medium text-red-600 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      {message && (
        <p
          className="text-center text-sm font-medium text-green-600 dark:text-green-400"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.comment_id}
            className="rounded-lg border bg-white dark:bg-gray-800 p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Author: {comment.author}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Votes: {comment.votes}
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{comment.body}</p>
            <button
              onClick={() => handleDelete(comment.comment_id)}
              disabled={disabled}
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm ${
                disabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {disabled ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentList;