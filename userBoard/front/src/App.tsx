import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import "./css/reset.scss"
import "./css/common.scss"

import AuthContext from './store/auth-context';

import Layout from './components/Layout/Layout';

import AuthPage from './pages/AuthPage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ArticleListPage from './pages/ArticleListPage';
import CreateArticlePage from './pages/CreateArticlePage';
import UpdateArticlePage from './pages/UpdateArticlePage';
import ArticleOnePage from './pages/ArticleOnePage';
import TestApp from './components/practice/TestApp';
import State from './components/movie/State';
import MoviePage from './pages/movie/MoviePage';
import MovieOnePage from './pages/movie/MovieOnePage';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign_up" element={authCtx.isLogin ? <Navigate to='/' /> : <CreateAccountPage />} />
        <Route path="/login/*"
          element={authCtx.isLogin ? <Navigate to='/' /> : <AuthPage />}
        />
        <Route path="/profile" element={!authCtx.isLogin ? <Navigate to='/' /> : <ProfilePage />} />
        <Route path="/create" element={!authCtx.isLogin ? <Navigate to='/' /> : <CreateArticlePage />} />
        <Route path="/page/:page_id" element={<ArticleListPage />} />
        <Route path="/update/:article_id" element={!authCtx.isLogin ? <Navigate to='/' /> : <UpdateArticlePage />} />
        <Route path="/article/:article_id" element={<ArticleOnePage />} />

        <Route path="/test_app" element={<TestApp />} />
        <Route path="/movie/coin_state" element={<State />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieOnePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
