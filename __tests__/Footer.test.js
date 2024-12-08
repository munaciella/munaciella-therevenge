// eslint-disable-next-line no-unused-vars
import React from "react";
import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../src/Components/Footer";
import "@testing-library/jest-dom";

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  
describe('Footer', () => {
    test('renders logo image', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      
      const logo = screen.getByAltText(/Munaciella News Logo/i);
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'assets/Munaciella-logo.jpg');
    });
  
    test('renders copyright text', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      
      const copyright = screen.getByText(/All rights reserved/i);
      expect(copyright).toBeInTheDocument();
    });
  
    test('renders navigation links', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
  
      const homeLink = screen.getByText(/Home/i);
      const aboutLink = screen.getByText(/About/i);
      const loginLink = screen.getByText(/Log In/i);
  
      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
    });
  
    test('renders social media icons', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      
      const linkedinIcon = screen.getByRole('link', { name: /LinkedIn/i });
      const githubIcon = screen.getByRole('link', { name: /GitHub/i });
  
      expect(linkedinIcon).toBeInTheDocument();
      expect(githubIcon).toBeInTheDocument();
    });
  
    test('renders author info and link to website', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      
      const authorLink = screen.getByRole('link', { name: /Francesco's Image/i });
      expect(authorLink).toBeInTheDocument();
      expect(authorLink).toHaveAttribute('href', 'https://francesco-dev.vercel.app');
    });
});