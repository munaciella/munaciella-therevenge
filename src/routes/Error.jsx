import { Link } from "react-router-dom";

function Error({ title, msg }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg mt-4 max-w-md mx-auto text-center shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      {msg && <p className="mt-3">{msg}</p>}
      <Link
        to={-1}
        className="inline-block mt-4 text-sm font-medium text-red-600 hover:underline"
      >
        Go back
      </Link>
    </div>
  );
}

export default Error;