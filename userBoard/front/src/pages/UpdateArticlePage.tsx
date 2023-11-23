import React from 'react'
import { useParams } from 'react-router-dom'
import CreateArticleForm from '../components/Article/CreateArticleForm';
import { ArticleContextProvider } from '../store/article-context';

function UpdateArticlePage() {
  let { article_id } = useParams();

  return (
    <ArticleContextProvider>
      <CreateArticleForm item={article_id} />
    </ArticleContextProvider>
  )
}

export default UpdateArticlePage