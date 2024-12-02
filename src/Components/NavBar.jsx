import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  return (
    <>
      <header className="bg-redditOrange dark:bg-gray-800 text-white py-4 md:py-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Munaciella News
        </h1>
      </header>

      <nav className="bg-redditOrange dark:bg-gray-800 py-2 mt-4 rounded-lg shadow-lg">
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/signup" className="text-white hover:text-gray-300 transition-colors">
              Sign up
            </a>
          </li>
          <li>
            <a href="/login" className="text-white hover:text-gray-300 transition-colors">
              Users
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;