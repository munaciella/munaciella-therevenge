import { Link } from "react-router-dom";

function Error({ title, msg }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border border-red-500 text-red-700 dark:text-red-400 p-6 rounded-lg max-w-md mx-auto text-center shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
          {title}
        </h2>
        {msg && <p className="mt-4 text-gray-700 dark:text-gray-300">{msg}</p>}
        <Link
          to={-1}
          className="inline-block mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}

export default Error;