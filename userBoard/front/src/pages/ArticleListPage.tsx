import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import ArticleList from '../components/Article/ArticleList';
import { ArticleContextProvider } from '../store/article-context';

function ArticleListPage() {
  let { page_id } = useParams();

  return (
    <ArticleContextProvider>
      <Fragment>
        <ArticleList item={page_id} />
        {/* <SearchForm /> */}
      </Fragment>
    </ArticleContextProvider>


  )
}

export default ArticleListPage

