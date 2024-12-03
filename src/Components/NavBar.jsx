import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const location = useLocation(); // Get current location to highlight active link

  return (
    <header className="bg-redditOrange dark:bg-gray-800 text-white rounded-lg shadow-md">
      <nav className="flex items-center px-6 py-4">
        {/* Left Section */}
        <ul className="flex space-x-8 text-lg font-semibold">
          <li>
            <Link
              to="/login"
              className={`transition-colors ${
                location.pathname === '/login' ? 'underline' : 'hover:underline'
              }`}
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className={`transition-colors ${
                location.pathname === '/signup' ? 'underline' : 'hover:underline'
              }`}
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Center Section */}
        <div className="flex-grow text-center">
          <Link to="/" className="block">
            <img
              src="assets/Munaciella-logo.jpg"
              alt="Munaciella News Logo"
              className="w-28 h-28 rounded-full mx-auto"
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;