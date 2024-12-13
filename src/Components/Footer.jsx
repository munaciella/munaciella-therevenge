// eslint-disable-next-line no-unused-vars
import React from "react"
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300 dark:border-gray-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-0 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        <div>
          <Link to="/">
            <img
              src="assets/Munaciella-logo.jpg"
              alt="Munaciella News Logo"
              className="w-16 h-16 mx-auto md:mx-0 rounded-full"
            />
          </Link>
          <p className="mt-4">
            <span className="text-sm">
              &copy; {new Date().getFullYear()} Munaciella News.
            </span>
            <br />
            All rights reserved.
          </p>
        </div>

        <div className="flex flex-col space-y-2 items-center">
          <Link to="/" className="hover:underline underline-offset-2">
            Home
          </Link>
          <Link to="/about" className="hover:underline underline-offset-2">
            About
          </Link>
          <Link to="/login" className="hover:underline underline-offset-2">
            Log In
          </Link>
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm">
            <span className="text-gray-700 dark:text-gray-200 text-lg">
              Made with <span className="text-red-500">♡</span> by
            </span>
            <a
              href="https://francesco-dev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-9 h-9 inline-block align-middle ml-1"
                src="assets/Fran-avatar.png"
                alt="Francesco's Image"
              />
            </a>
          </p>

          <div className="flex justify-center md:justify-end space-x-4 mt-6">
            <a
              href="https://linkedin.com/in/francesco-vurchio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/munaciella"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
