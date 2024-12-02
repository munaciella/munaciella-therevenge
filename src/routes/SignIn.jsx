import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsernameContext } from "../Components/UsernameContext";
import { getUser } from "../API/api";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
  const { setUsername } = useContext(UsernameContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getUser(usernameInput);
      setUsername(response.data.users.username);
      nav(`/`);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          required
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
        </button>
        {isError && (
          <p className="text-red-500 text-sm mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default SignIn;