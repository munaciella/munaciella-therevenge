import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../API/api';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentCard from '../Components/CommentCard';

const CommentList = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((response) => {
        setIsLoading(false);
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Something went wrong</h2>;

  const handleDelete = (comment_id) => {
    setDisabled(true);
    deleteComment(comment_id)
      .then(() => {
        const newComments = comments.filter(
          (comments) => comments.comment_id != comment_id
        );
        setComments(newComments);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setDisabled(false);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      });
  };

  return (
    <>
      <section>
        <CommentForm article_id={article_id} setComments={setComments} />
        <ul>
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default CommentList;
