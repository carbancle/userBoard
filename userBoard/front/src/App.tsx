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
      </Routes>
    </Layout>
  );
}

export default App;
