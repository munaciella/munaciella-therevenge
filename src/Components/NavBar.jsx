import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const location = useLocation();

  return (
    <header className="bg-redditOrange dark:bg-gray-800 text-white shadow-lg">
      <nav className="flex items-center px-6 py-4">
        <ul className="flex space-x-8 text-lg font-semibold">
          <li>
            <Link
              to="/login"
              className={`transition-colors underline-offset-4 ${
                location.pathname === "/login" ? "underline" : "hover:underline"
              }`}
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`transition-colors underline-offset-4 ${
                location.pathname === "/about" ? "underline" : "hover:underline"
              }`}
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex-grow text-center">
          <Link to="/" className="block">
            <img
              src="assets/Munaciella-logo.jpg"
              alt="Munaciella News Logo"
              className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg"
            />
          </Link>
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;