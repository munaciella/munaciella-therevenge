import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, getUser } from "../API/api";
import UsernameContext from "../Components/UsernameContext";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
  const { username, setUsername } = useContext(UsernameContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userListError, setUserListError] = useState(false);
  const nav = useNavigate();

  console.log("Username:", username);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(({ users }) => {
        setUsers(users);
        setUserListError(false);
      })
      .catch(() => {
        setUserListError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await getUser(usernameInput);

      if (passwordInput !== "password123") {
        throw new Error("Invalid password");
      }

      setUsername(response.data.user.username);
      setIsSuccess(true);
      setTimeout(() => nav(`/`), 2000);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8 px-4 mt-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSignIn}>
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-redditOrange mb-4"
          />

          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-redditOrange mb-4"
          />

          <button
            type="submit"
            className="w-full bg-redditOrange text-white py-2 rounded-lg font-medium focus:outline-none"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign In"
            )}
          </button>
          {isError && (
            <p className="text-red-500 text-sm mt-4">
              Invalid username or password. Please try again.
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm mt-4">
              Logged in successfully! Redirecting...
            </p>
          )}
        </form>
      </div>

      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Users
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : userListError ? (
          <p className="text-red-500 text-center">
            Unable to fetch user list. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.slice(0, count).map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            className="bg-redditOrange text-white py-2 px-6 rounded-lg font-medium focus:outline-none"
            onClick={() => {
              if (count >= users.length) {
                setCount(2);
              } else {
                setCount(count + 2);
              }
            }}
          >
            {count >= users.length ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserCard({ user }) {
  const { avatar_url: url, username } = user;

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6">
      <img
        src={url}
        alt={`Avatar of ${username}`}
        className="w-auto h-auto rounded-lg object-cover mb-4"
      />
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        {username}
      </h3>
    </div>
  );
}