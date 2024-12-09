// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import Vote from '../src/Components/Vote';
import { voteArticle } from '../src/API/api';

jest.mock('../src/API/api', () => ({
  voteArticle: jest.fn(),
}));

describe('Vote Component', () => {
  const mockArticleId = 1;
  const initialVotes = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial vote count', () => {
    render(<Vote article_id={mockArticleId} votes={initialVotes} />);
    expect(screen.getByText(initialVotes)).toBeInTheDocument();
  });

  test('increments vote count on upvote', async () => {
    const updatedVotes = initialVotes + 1;

    voteArticle.mockResolvedValueOnce({ data: { votes: updatedVotes } });

    render(<Vote article_id={mockArticleId} votes={initialVotes} />);
    const upvoteButton = screen.getByTestId('upvote-button');

    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(voteArticle).toHaveBeenCalledWith(mockArticleId, 1);

    await waitFor(() =>
      expect(screen.getByText(updatedVotes)).toBeInTheDocument()
    );
  });

  test('decrements vote count on downvote', async () => {
    const updatedVotes = initialVotes - 1;

    voteArticle.mockResolvedValueOnce({ data: { votes: updatedVotes } });

    render(<Vote article_id={mockArticleId} votes={initialVotes} />);
    const downvoteButton = screen.getByTestId('downvote-button');

    await act(async () => {
      fireEvent.click(downvoteButton);
    });

    expect(voteArticle).toHaveBeenCalledWith(mockArticleId, -1);

    await waitFor(() =>
      expect(screen.getByText(updatedVotes)).toBeInTheDocument()
    );
  });
});
