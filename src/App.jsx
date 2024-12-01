import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsernameProvider } from './Components/UsernameContext.jsx'
import ArticlesList from './Components/routes/ArticlesList.jsx';
import ArticlePage from './Components/routes/ArticlePage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Error from './Components/Error/Error.jsx';
import NavBar from './Components/NavBar.jsx';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <BrowserRouter>
        <UsernameProvider>
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
