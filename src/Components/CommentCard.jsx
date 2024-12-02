const CommentCard = ({ comment, handleDelete }) => {
  return (
    <div className="border border-gray-300 p-4 m-4 w-full sm:w-1/2 rounded-lg bg-amber-100 text-black shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-lg font-semibold">Author: {comment.author}</h3>
      <h3 className="text-lg font-semibold">Votes: {comment.votes}</h3>
      <h3 className="text-lg font-semibold mt-2">Comment:</h3>
      <p className="text-base mt-1">{comment.body}</p>
      <button
        className="mt-4 bg-red-500 text-white text-sm px-4 py-2 rounded-lg border-none cursor-pointer shadow-sm hover:bg-red-600 hover:shadow-md transition-all"
        onClick={() => {
          handleDelete(comment.comment_id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default CommentCard;