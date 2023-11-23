import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import ArticleOne from '../components/Article/ArticleOne';
import CommentList from '../components/Article/CommentList';
import Recommend from '../components/Article/Recommend';
import { ArticleContextProvider } from '../store/article-context';
import { CommentContextProvider } from '../store/comment-context';
import { RecommendContextProvider } from '../store/recommend-context';
import { ToasterContextProvider } from '../ui/toaster-context';

function ArticleOnePage() {
  let { article_id } = useParams();

  return (
    <Fragment>
      <ArticleContextProvider>
        <ArticleOne item={article_id} />
      </ArticleContextProvider>
      <RecommendContextProvider>
        <Recommend item={article_id} />
      </RecommendContextProvider>
      <CommentContextProvider>
        <ToasterContextProvider>
          <CommentList item={article_id} />
        </ToasterContextProvider>
      </CommentContextProvider>
    </Fragment>
  )
}

export default ArticleOnePage