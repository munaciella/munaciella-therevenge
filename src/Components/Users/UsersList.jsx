import { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { getUsers } from '../../API/api';
import './UserList.css';
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
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (isError) return <h2>Something went wrong</h2>;

  return (
    <div className="users">
      <h2>Users:</h2>
      <div className="grid-container">
        {users
          .map((user, index) => {
            return <UserCard key={index} user={user} />;
          })
          .slice(count - 2, count)}
      </div>
      <button
        className="button"
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
  );
}
