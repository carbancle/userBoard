import React, { useState } from 'react'
import * as articleAction from './article-action';

type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody: string,
  createdAt: string,
  updatedAt: string,
  isWritten?: boolean
}

interface PostArticle {
  id?: string,
  title: string,
  body: string
}

interface Ctx {
  article?: ArticleInfo | undefined,
  page: ArticleInfo[],
  isSuccess: boolean,
  isGetUpdateSuccess: boolean,
  totalPages: number,
  getPageList: (pageId: string) => void;
  getArticle: (param: string, token?: string) => void;
  createArticle: (article: PostArticle, token: string) => void;
  getUpdateArticle: (token: string, param: string) => void;
  updateArticle: (token: string, article: PostArticle) => void;
  deleteArticle: (token: string, param: string) => void;
}

const ArticleContext = React.createContext<Ctx>({
  article: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getPageList: () => { },
  getArticle: () => { },
  createArticle: () => { },
  getUpdateArticle: () => { },
  updateArticle: () => { },
  deleteArticle: () => { }
})



function ArticleContextProvider(props: any) {
  const [article, setArticle] = useState<ArticleInfo>();
  const [page, setPage] = useState<ArticleInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState<boolean>(false);

  const getPageHandler = async (pageId: string) => {
    setIsSuccess(false);

    const data = await articleAction.getPageList(pageId);
    const page: ArticleInfo[] = data?.data.content;
    const pages: number = data?.data.totalPages;

    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
  }

  const getArticleHandler = (param: string, token?: string) => {
    setIsSuccess(false);

    const data = (token ? articleAction.getOneArticle(param, token) : articleAction.getOneArticle(param));
    data.then((result) => {
      if (result !== null) {
        const article: ArticleInfo = result.data;
        setArticle(article);
      }
    })

    setIsSuccess(true);
  }

  const createArticleHandler = (article: PostArticle, token: string) => {
    setIsSuccess(false);

    const data = articleAction.createArticle(token, article);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    })
    setIsSuccess(true);
  }

  const getUpdateArticleHandler = async (token: string, param: string) => {
    setIsGetUpdateSuccess(false);

    const updateData = await articleAction.getUpdateArticle(token, param);
    const article: ArticleInfo = updateData?.data

    setArticle(article);
    setIsGetUpdateSuccess(true);
  }

  const updateArticleHandler = (token: string, article: PostArticle) => {
    setIsSuccess(false);
    console.log('update api start');

    const data = articleAction.updateArticle(token, article);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    })
    setIsSuccess(true);
  }

  const deleteArticleHandler = (token: string, param: string) => {
    setIsSuccess(false);

    const data = articleAction.deleteArticle(token, param);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    })
    setIsSuccess(true);
  }

  const contextValue: Ctx = {
    article,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandler,
    getArticle: getArticleHandler,
    createArticle: createArticleHandler,
    getUpdateArticle: getUpdateArticleHandler,
    updateArticle: updateArticleHandler,
    deleteArticle: deleteArticleHandler
  }

  return (
    <ArticleContext.Provider value={contextValue}>
      {props.children}
    </ArticleContext.Provider>
  )
}

export { ArticleContextProvider };

export default ArticleContext;