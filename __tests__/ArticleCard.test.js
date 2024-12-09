// eslint-disable-next-line no-unused-vars
import React from 'react';
import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleCard from '../src/Components/ArticleCard';
import '@testing-library/jest-dom';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('ArticleCard', () => {
  const mockArticle = {
    article_id: 1,
    body: 'This is a sample article body.',
    votes: 10,
    title: 'Sample Article',
    topic: 'Technology',
    article_img_url: 'https://via.placeholder.com/150',
    author: 'John Doe',
    comment_count: 5,
    created_at: '2020-09-16T12:00:00Z',
  };

  test('renders article title and topic', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.topic)).toBeInTheDocument();
  });

  test('renders article image with alt text', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(`${mockArticle.title} image`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockArticle.article_img_url);
  });

  test('renders article body, author, and comments count', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockArticle.body)).toBeInTheDocument();
    expect(
      screen.getByText(`Author: ${mockArticle.author}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockArticle.comment_count} comments`)
    ).toBeInTheDocument();
  });

  test('renders Vote component', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockArticle.votes.toString())).toBeInTheDocument();
  });

  test('navigates to correct article page when image is clicked', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/articles/${mockArticle.article_id}`);
  });
});
