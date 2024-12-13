// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../src/routes/AboutPage';
import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';

describe('AboutPage Component', () => {
  test('renders the title', () => {
    render(<AboutPage />);

    const titleElement = screen.getByText('About Munaciella News');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-3xl font-bold text-center mb-6 text-redditOrange');
  });

  test('renders all paragraphs with correct text content', () => {
    render(<AboutPage />);

    const firstParagraph = screen.getByText(
        (_, element) =>
          element.textContent ===
          'Welcome to Munaciella News, your go-to platform for the latest updates, insightful articles, and trending stories across a variety of topics. Whether you\'re catching up on world news or diving into niche topics, Munaciella News aims to deliver reliable, engaging, and well-curated content.'
      );
      const otherParagraphs = [
        'Built with a passion for knowledge sharing, Munaciella News was designed to emulate the familiar feel of popular platforms while bringing a unique and accessible experience to our users.',
        'This project is a work-in-progress and continuously evolving to incorporate new features, improve functionality, and ensure the best user experience. We appreciate your support and feedback as we grow!',
        'Thank you for being a part of Munaciella News. If you have any suggestions or feedback, please feel free to reach out!',
      ];
  
      expect(firstParagraph).toBeInTheDocument();
  
      otherParagraphs.forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

  test('renders the italicized quote', () => {
    render(<AboutPage />);

    const quoteElement = screen.getByText('“Stay informed, stay inspired.”');
    expect(quoteElement).toBeInTheDocument();
    expect(quoteElement).toHaveClass('text-gray-600 dark:text-gray-400 italic');
  });

  test('applies correct styling to the main container', () => {
    render(<AboutPage />);

    const container = screen.getByTestId('about-container');
    expect(container).toHaveClass(
      'min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center py-12 px-6 mt-4'
    );
  });
});