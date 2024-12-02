import { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { getUsers } from '../API/api';
import { CircularProgress } from '@mui/material';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(({ users }) => {
        setUsers(users);
        setIsError(null);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <h2 className="text-center text-red-500 text-xl">Something went wrong</h2>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Users:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users
          .map((user, index) => <UserCard key={index} user={user} />)
          .slice(count - 2, count)}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={() => {
            if (count >= users.length) {
              setCount(2);
            } else {
              setCount(count + 2);
            }
          }}
        >
          Show others
        </button>
      </div>
    </div>
  );
}