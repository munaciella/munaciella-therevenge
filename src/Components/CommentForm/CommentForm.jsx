import { postComment } from '../../API/api';
import { UsernameContext } from '../UsernameContext';
import { useContext, useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ article_id, comments, setComments }) => {
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
          setComments((currentComments) => {
            return [data.comment, ...currentComments];
          });
          setInput('');
        })
        .catch((err) => {
          setIsError('Something went wrong. Please try again.');
        })
        .finally(() => {
          setDisabled(false);
          setTimeout(() => {}, 2000);
        });
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="CommentForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment" className="InputLabel">
          Add a Comment
        </label>

        <textarea
          id="comment"
          onChange={handleChange}
          value={input}
          placeholder="Write your comment here"
          className="CommentTextArea"
          required
          style={{
            fontFamily: 'Futura, sans-serif',
            fontSize: '16px',
            color: 'black',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            resize: 'vertical',
            minHeight: '100px',
            width: '80%',
            boxSizing: 'border-box',
          }}
        />
        <button className="SubmitButton">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
