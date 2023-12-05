import React, { useRef } from 'react'

function Comment(props: any) {
  const deleteIdRef = useRef<HTMLInputElement>(null);

  const submitDeleteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current!.value
    props.onDelete(deleteId);
  }

  return (
    <li className='comment'>
      <div className='header'>
        <span>{props.memberNickname}</span>
        <span>{props.createdAt}</span>
      </div>
      <p>{props.commentBody}</p>
      <form onSubmit={submitDeleteHandler}>
        <input type="hidden" name="comment_id" value={props.commentId} ref={deleteIdRef} />
        {props.written && <div className='submit_box'><button type="submit">삭제</button></div>}
      </form>
    </li>
  )
}

export default Comment