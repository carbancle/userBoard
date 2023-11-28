import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, /*useNavigate*/ } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import "../../css/Article.scss";
import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';
import Paging from './Paging';

type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody?: string,
  createdAt: string,
  updatedAt?: string,
  isWritten?: boolean
}

function ArticleList(props: any) {
  // let navigate = useNavigate();
  const pageId = String(props.item);

  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);

  const [AList, setAList] = useState<ArticleInfo[]>([]);
  const [maxNum, setMaxNum] = useState<number>(1);

  let isLogin = authCtx.isLogin;

  const fetchListHandler = useCallback(
    () => {
      articleCtx.getPageList(pageId);
    },
    [],
  )

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler])

  const fetchArticleData = useCallback(() => {
    if (articleCtx.isSuccess) {
      setAList(articleCtx.page);
      console.log(AList);
      setMaxNum(articleCtx.totalPages);
    }
  }, [articleCtx])

  useEffect(() => {
    fetchArticleData();
  }, [fetchArticleData])

  const articleList = AList.map((list) => {
    return (
      <tr key={list.articleId}>
        <td><Link to={`/article/${list.articleId}`}>{list.articleTitle}</Link></td>
        <td className='writer'>{list.memberNickname}</td>
        <td className='updated_date'>{list.createdAt}</td>
      </tr>
    )
  })
  // useEffect(() => {
  //   if (articleCtx.isSuccess) {
  //     setAList(articleCtx.page);
  //     console.log(AList);
  //     setMaxNum(articleCtx.totalPages);
  //   }
  // }, [AList, articleCtx])



  return (
    <div className='article_list container'>
      <table>
        <thead>
          <tr>
            <td>제목</td>
            <td width="10%">작성자</td>
            <td width="20%">등록일</td>
          </tr>
        </thead>
        <tbody>
          {articleList}
        </tbody>
      </table>
      <div>
        {isLogin &&
          <Link to="/create">
            <Button>글 작성</Button>
          </Link>}
      </div>
      <Paging currentPage={Number(pageId)} maxPage={maxNum} />
    </div>
  )
}

export default ArticleList