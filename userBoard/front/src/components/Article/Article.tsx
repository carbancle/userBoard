import React from 'react'
import { useNavigate } from 'react-router-dom'
import CommentList from './CommentList';
import Recommend from './Recommend';

function Article(props: any) {
  let navigate = useNavigate();

  const id = props.item!.articleId.toString();

  const backHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/page/1")
  }

  const updateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("../update/" + id)
  }

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(id)
    }
  }

  return (
    <div className='article'>
      <div className="container">
        <header className='title'>
          <h4>{props.item!.articleTitle}</h4>
          <div className='detail'>
            <span className='nickname'>이름: {props.item!.memberNickname}</span><br />
            <span className='updated_date'>작성일: {props.item!.updatedAt}</span>
          </div>
        </header>
        <div className='content_box'>
          <div>{props.item!.articleBody}</div>
        </div>
        <div className="recommend_box">
          <Recommend item={id} />
        </div>
        <div className="comment_box">
          <CommentList item={id} />
        </div>
        <div className="button_box">
          <button onClick={backHandler}>뒤로</button>
          {props.item!.written &&
            <>
              <button className='update' onClick={updateHandler}>수정</button>
              <button className='danger' onClick={deleteHandler}>삭제</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Article