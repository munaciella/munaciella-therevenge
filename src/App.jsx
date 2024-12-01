//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsernameProvider } from './Components/UsernameContext/UsernameContext.jsx';
import ArticlesList from './Components/ArticlesList/ArticlesList';
import ArticlePage from './Components/ArticlePage/ArticlePage';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Error from './Components/Error/Error.jsx';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <BrowserRouter>
        <UsernameProvider>
          <Header />
          <NavBar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<ArticlesList />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/articles/:article_id" element={<ArticlePage />} />
              <Route
                path="*"
                element={
                  <Error
                    title="404 Page Not Found"
                    msg="Sorry, this page doesn't exist yet... 😢"
                  />
                }
              />
            </Routes>
          </main>
        </UsernameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
