import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context';

function ChangeNickname() {
  const authCtx = useContext(AuthContext);

  let navigate = useNavigate();

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredNickname = nicknameInputRef.current!.value;
    console.log('change nickname start!');
    authCtx.changeNickname(enteredNickname);
    if (authCtx.isSuccess) {
      alert("변경 되었습니다.");
      authCtx.getUser();
      navigate("/", { replace: true });
    }
  }

  return (
    <form onSubmit={submitHandler} className='change_nickname'>
      <div className="change_nickname">
        <label htmlFor="nickname"></label>
        <input type="text" id='nickname' minLength={3} required ref={nicknameInputRef} />
      </div>
      <div className="change_button">
        <button type='submit'>Change Nickname</button>
      </div>
    </form>
  )
}

export { ChangeNickname }