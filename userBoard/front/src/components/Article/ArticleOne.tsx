import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';
import "../../css/ArticleContent.scss"
import Article from './Article';

type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody?: string,
  createdAt: string,
  updatedAt?: string,
  isWritten?: boolean
}

function ArticleOne(props: any) {
  let navigate = useNavigate();

  const [article, setArticle] = useState<ArticleInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);

  let isLogin = authCtx.isLogin;
  const id = String(props.item);

  const deleteHandler = (id: string) => {
    articleCtx.deleteArticle(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate("/page/1")
  }

  const getContext = useCallback(
    () => {
      setIsLoading(false);
      (isLogin ? articleCtx.getArticle(id, authCtx.token) : articleCtx.getArticle(id));
    },
    [isLogin],
  )

  useEffect(() => {
    getContext();
  }, [getContext])


  useEffect(() => {
    if (articleCtx.isSuccess) {
      return () => {
        setArticle(articleCtx.article);
        console.log(article?.createdAt);
        setIsLoading(true);
      }
    }
    return;
  }, [articleCtx, article])

  let content = <p>Loading...</p>

  if (isLoading && article) {
    content = <Article item={article} onDelete={deleteHandler} />
  }

  return (
    <div className='article_one'>
      {content}
    </div>
  )
}

export default ArticleOne