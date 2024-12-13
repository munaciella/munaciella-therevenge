// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeAll, jest, beforeEach } from "@jest/globals";
import UsernameContext from "../src/Components/UsernameContext";
import LoginPage from "../src/routes/LoginPage";
import { getUsers } from "../src/API/api";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("../src/API/api", () => ({
  getUsers: jest.fn(),
  getUser: jest.fn(),
}));

describe("LoginPage Component", () => {
  const mockUsers = [
    { username: "user1", avatar_url: "url1" },
    { username: "user2", avatar_url: "url2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form and user list", async () => {
    getUsers.mockResolvedValueOnce({ users: mockUsers });

    render(
      <MemoryRouter>
        <UsernameContext.Provider value={{ username: "", setUsername: jest.fn() }}>
          <LoginPage />
        </UsernameContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/user[12]/i)).toHaveLength(2);
    });
  });

  test("shows loading indicator and handles API errors for users", async () => {
    getUsers.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <UsernameContext.Provider value={{ username: "", setUsername: jest.fn() }}>
          <LoginPage />
        </UsernameContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Unable to fetch user list/i)).toBeInTheDocument();
    });
  });

  test("handles 'Show More' and 'Show Less' button functionality", async () => {
    getUsers.mockResolvedValueOnce({ users: [...mockUsers, { username: "user3", avatar_url: "url3" }] });

    render(
      <MemoryRouter>
        <UsernameContext.Provider value={{ username: "", setUsername: jest.fn() }}>
          <LoginPage />
        </UsernameContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/user/i)).toHaveLength(2);
    });

    fireEvent.click(screen.getByRole("button", { name: /Show More/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/user/i)).toHaveLength(5);
    });

    fireEvent.click(screen.getByRole("button", { name: /Show Less/i }));
    expect(screen.getAllByText(/user/i)).toHaveLength(4);
  });
});