// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UsernameContext from '../src/Components/UsernameContext';
import CommentList from '../src/Components/CommentList';
import { getComments, deleteComment, postComment } from '../src/API/api';
import '@testing-library/jest-dom';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

jest.mock('../src/API/api');

describe('CommentList', () => {
  const mockComments = [
    { comment_id: 1, author: 'User1', body: 'First comment', votes: 10 },
    { comment_id: 2, author: 'User2', body: 'Second comment', votes: 5 },
  ];

  const setup = (initialRoute = '/article/1') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/article/:article_id" element={
            <UsernameContext.Provider value={{ username: 'TestUser' }}>
              <CommentList />
            </UsernameContext.Provider>
          } />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message initially', async () => {
    getComments.mockResolvedValueOnce({ data: { comments: [] } });
  
    await act(async () => {
    setup();
    });
  
    expect(screen.getByText(/Loading comments.../i)).toBeInTheDocument();
  });

  test('fetches and displays comments', async () => {
    getComments.mockResolvedValueOnce({ data: { comments: mockComments } });

    await act(async () => {
    setup();
    });

    await waitFor(() => {
      mockComments.forEach((comment) => {
        expect(screen.getByText(comment.body)).toBeInTheDocument();
      });
    });
  });

  test('adds a new comment', async () => {
    getComments.mockResolvedValueOnce({ data: { comments: mockComments } });
    postComment.mockResolvedValueOnce({
      comment: { comment_id: 3, author: 'TestUser', body: 'New comment', votes: 0 },
    });

    await act(async () => {
    setup();
    })

    await waitFor(() => {
      expect(screen.getByText(/First comment/i)).toBeInTheDocument();
    });

    await act(async () => {
    fireEvent.change(screen.getByPlaceholderText(/Write your comment here.../i), {
      target: { value: 'New comment' },
    });
    fireEvent.click(screen.getByText(/Submit/i));
});

    await waitFor(() => {
      expect(screen.getByText(/New comment/i)).toBeInTheDocument();
    });
  });

  test('deletes a comment', async () => {
    getComments.mockResolvedValueOnce({ data: { comments: mockComments } });
    deleteComment.mockResolvedValueOnce();

    await act(async () => {
    setup();
    });

    await waitFor(() => {
      expect(screen.getByText(/First comment/i)).toBeInTheDocument();
    });

    await act(async () => {
    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    });

    await waitFor(() => {
      expect(screen.queryByText(/First comment/i)).not.toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    getComments.mockRejectedValueOnce(new Error('Failed to fetch'));

    await act(async () => {
    setup();
    });

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});