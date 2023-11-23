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
      <h4 className=''>{props.memberNickname}</h4>
      <p>{props.commentBody}</p>
      <p>{props.createAt}</p>
      <form onSubmit={submitDeleteHandler}>
        <input type="hidden" name="comment_id" value={props.commentId} ref={deleteIdRef} />
        {props.written && <button type="submit">삭제</button>}
      </form>
    </li>
  )
}

export default Comment