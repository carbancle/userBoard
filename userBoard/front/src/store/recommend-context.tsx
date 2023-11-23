import React, { useState } from 'react'
import * as recommendAction from './recommend-action'

type Recommends = {
  recommendNum: number,
  recommended: boolean
}

interface RecommendCtx {
  recommends: Recommends | undefined,
  isSuccess: boolean,
  isChangeSuccess: boolean,
  getRecommends: (param: string, token?: string) => void;
  postRecommend: (id: string, token: string) => void;
  deleteRecommend: (param: string, token: string) => void;
}

const RecommendContext = React.createContext<RecommendCtx>({
  recommends: undefined,
  isSuccess: false,
  isChangeSuccess: false,
  getRecommends: () => { },
  postRecommend: () => { },
  deleteRecommend: () => { }
})

function RecommendContextProvider(props: any) {
  const [recommends, setRecommends] = useState<Recommends>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isChangeSuccess, setIsChangeSuccess] = useState<boolean>(false);

  const getRecommendsHandler = (param: string, token?: string) => {
    setIsSuccess(false);

    const data = (token ? recommendAction.getRecommends(param, token) : recommendAction.getRecommends(param));
    data.then((result) => {
      if (result !== null) {
        const recommends: Recommends = result.data;
        setRecommends(recommends);
      }
    })
    setIsSuccess(true);
  }

  const postRecommendHandler = async (id: string, token: string) => {
    setIsChangeSuccess(false);

    console.log("id, token 값", id, token)
    const postData = await recommendAction.createRecommend(id, token);
    const msg = await postData?.data;
    console.log(msg);

    // recommend post시 추천 값(추천 수)이 변하므로 추천 값을 다시 호출하여 state를 재정립
    const getData = await recommendAction.getRecommends(id, token);
    const recommends: Recommends = getData?.data;
    setRecommends(recommends);
    setIsSuccess(true);
  }

  const deleteRecommendHandler = async (param: string, token: string) => {
    setIsChangeSuccess(false);

    const deleteData = await recommendAction.deleteRecommend(param, token);
    const msg = await deleteData?.data;
    console.log(msg);

    const getData = await recommendAction.getRecommends(param, token);
    const recommends: Recommends = getData?.data;
    setRecommends(recommends);
    setIsChangeSuccess(true);
  }

  const contextValue: RecommendCtx = {
    recommends,
    isSuccess,
    isChangeSuccess,
    getRecommends: getRecommendsHandler,
    postRecommend: postRecommendHandler,
    deleteRecommend: deleteRecommendHandler
  }

  return (
    <RecommendContext.Provider value={contextValue}>
      {props.children}
    </RecommendContext.Provider>
  )
}

export { RecommendContextProvider };

export default RecommendContext;
