import React, { useState, useEffect, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context';
import RecommendContext from '../../store/recommend-context';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

type Recommends = {
  recommendNum: number,
  recommended: boolean
}

function Recommend(props: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommends, setRecommends] = useState<Recommends>();

  const authCtx = useContext(AuthContext);
  const recommendCtx = useContext(RecommendContext);

  let isLogin = authCtx.isLogin;
  // props.item은 article_id 값을 받아온다
  const id = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? recommendCtx.getRecommends(id, authCtx.token) : recommendCtx.getRecommends(id));
  }, [isLogin])

  useEffect(() => {
    getContext();
  }, [getContext])

  useEffect(() => {
    if (recommendCtx.isSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log("set", recommends);
      setIsLoading(true);
    }
  }, [recommendCtx, recommends])

  useEffect(() => {
    if (recommendCtx.isChangeSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log("change set", recommends);
      setIsLoading(true);
    }
  }, [recommendCtx.isChangeSuccess])

  const changeRecommend = () => {
    if (!isLogin) {
      return alert("로그인이 필요합니다.");
    } else {
      (recommends!.recommended ? recommendCtx.deleteRecommend(id, authCtx.token) : recommendCtx.postRecommend(id, authCtx.token));
    }
  }

  // const heartImage = (heart: string) => {
  //   return (
  //     <img alt="heart" className='heart_img' src={heart} onClick={changeRecommend} />
  //   )
  // }

  let media = <h3>is Loading...</h3>

  if (isLoading && recommends) {
    media = (
      <div className="vote_box">
        <div>
          {recommends.recommended ? <button onClick={changeRecommend}><Favorite /><h4>추천 {recommends.recommendNum}</h4></button> : <button onClick={changeRecommend}><FavoriteBorder /><h4>추천 {recommends.recommendNum}</h4></button>}

        </div>
      </div>
    )
  }




  return (
    <div className='recommend'>
      {media}
    </div>
  )
}

export default Recommend