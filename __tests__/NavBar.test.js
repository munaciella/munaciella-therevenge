// eslint-disable-next-line no-unused-vars
import React from "react"
import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NavBar from "../src/Components/NavBar";
import "@testing-library/jest-dom";

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

beforeAll(() => {
    if (typeof window !== 'undefined') {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
    }
  });

describe("NavBar Component", () => {
  test("renders the Navbar with links, logo, and theme toggle", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Munaciella News Logo")).toBeInTheDocument();

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("highlights the correct active link based on location", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="*" element={<NavBar />} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText("Log In");
    const aboutLink = screen.getByText("About");

    expect(loginLink).toHaveClass("underline");

    expect(aboutLink).not.toHaveClass("underline");
  });

  test("renders links with correct paths", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const loginLink = screen.getByText("Log In");
    const aboutLink = screen.getByText("About");

    expect(loginLink).toHaveAttribute("href", "/login");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  test("renders the logo with correct alt text and image source", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Munaciella News Logo");

    expect(logo).toHaveAttribute("src", "assets/Munaciella-logo.jpg");
  });

  test("renders the ThemeToggle component", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});