import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import ArticleOne from '../components/Article/ArticleOne';
import { ArticleContextProvider } from '../store/article-context';
import { CommentContextProvider } from '../store/comment-context';
import { RecommendContextProvider } from '../store/recommend-context';
import { ToasterContextProvider } from '../ui/toaster-context';

function ArticleOnePage() {
  let { article_id } = useParams();

  return (
    <Fragment>
      <ArticleContextProvider>
        <RecommendContextProvider>
          <CommentContextProvider>
            <ToasterContextProvider>
              <ArticleOne item={article_id} />
            </ToasterContextProvider>
          </CommentContextProvider>
        </RecommendContextProvider>
      </ArticleContextProvider>
    </Fragment>
  )
}

export default ArticleOnePage