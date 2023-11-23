import React from 'react'
import CreateArticleForm from '../components/Article/CreateArticleForm'
import { ArticleContextProvider } from '../store/article-context'

function CreateArticlePage() {
  return (
    <ArticleContextProvider>
      <CreateArticleForm item={undefined} />
    </ArticleContextProvider>
  )
}

export default CreateArticlePage