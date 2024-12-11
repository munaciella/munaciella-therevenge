// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach } from '@jest/globals';
import { UsernameProvider } from '../src/Components/UsernameProvider';
import UsernameContext from '../src/Components/UsernameContext';

beforeAll(() => {
    global.sessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
  });

describe('UsernameProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('provides default username from sessionStorage', () => {
    sessionStorage.setItem('username', 'Francesco');

    let contextValue;
    render(
      <UsernameProvider>
        <UsernameContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </UsernameContext.Consumer>
      </UsernameProvider>
    );

    expect(contextValue.username).toBe('Francesco');
  });

  test('updates sessionStorage when username changes', () => {
    let contextValue;
    render(
      <UsernameProvider>
        <UsernameContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </UsernameContext.Consumer>
      </UsernameProvider>
    );

    act(() => {
        contextValue.setUsername('NewUser');
      });
  
      expect(sessionStorage.getItem('username')).toBe('NewUser');
    });

  test('renders children correctly', () => {
    render(
      <UsernameProvider>
        <div data-testid="child">Hello, world!</div>
      </UsernameProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});