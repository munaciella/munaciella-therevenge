import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsernameContext } from '../UsernameContext';
import { getUser } from '../../API/api'; 
import './SignIn.css';
import { CircularProgress } from '@mui/material';

const SignIn = () => {
  const { username, setUsername } = useContext(UsernameContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser(usernameInput)
      .then((response) => {
        setUsername(response.data.users.username);
        setIsError(null);
      })
      .then(() => {
        nav(`/`);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    if (isError)
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
        </div>
      );
  };

  const handleChange = (event) => {
    setUsernameInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Already have an account?</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username"
        required
        onChange={(event) => handleChange(event.target.value)}
        value={username}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
