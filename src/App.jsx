import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsernameProvider } from './Components/UsernameProvider.jsx';
import ArticlesList from './routes/ArticlesList.jsx';
import ArticlePage from './routes/ArticlePage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import Error from './routes/Error.jsx';
import NavBar from './Components/NavBar.jsx';
import AboutPage from './routes/AboutPage.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <UsernameProvider>
          <NavBar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<ArticlesList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/articles/:article_id" element={<ArticlePage />} />
              <Route path="/about" element={<AboutPage />} />
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
          <Footer />
        </UsernameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
