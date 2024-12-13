// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error from '../src/routes/Error';
import '@testing-library/jest-dom';
import { describe, test, expect, jest, beforeAll, afterAll } from '@jest/globals';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

describe('Error Component', () => {
  test('renders with title and message', () => {
    render(
      <MemoryRouter>
        <Error title="Error 404" msg="Page not found" />
      </MemoryRouter>
    );

    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('renders without message', () => {
    render(
      <MemoryRouter>
        <Error title="Error 500" />
      </MemoryRouter>
    );

    expect(screen.getByText('Error 500')).toBeInTheDocument();
    expect(screen.queryByText('Page not found')).not.toBeInTheDocument();
  });

  test('renders "Go back" link', () => {
    render(
      <MemoryRouter>
        <Error title="Error 403" msg="Forbidden access" />
      </MemoryRouter>
    );

    const goBackLink = screen.getByText('Go back');
    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute('href', '/');
  });

  test('applies correct styling for light and dark modes', () => {
    render(
      <MemoryRouter>
        <Error title="Error 404" msg="Page not found" />
      </MemoryRouter>
    );

    const container = screen.getByText('Error 404').closest('div');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('dark:bg-gray-800');
    expect(container).toHaveClass('text-red-700');
    expect(container).toHaveClass('dark:text-red-400');
  });
});