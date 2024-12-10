// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach } from '@jest/globals';
import ThemeToggle from '../src/Components/ThemeToggle';

beforeEach(() => {
  window.localStorage.clear();
});

describe('ThemeToggle Component', () => {

  test('renders correctly with default theme based on localStorage or system preference', () => {
    localStorage.setItem('theme', 'dark');

    render(<ThemeToggle />);

    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  test('toggles theme between dark and light', () => {
    localStorage.setItem('theme', 'light');
    
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();

    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);

    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();

    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('applies dark mode class to document element when theme is dark', () => {
    localStorage.setItem('theme', 'dark');

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('applies light mode class to document element when theme is light', () => {
    localStorage.setItem('theme', 'light');

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});