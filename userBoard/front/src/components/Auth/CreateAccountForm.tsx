import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import "../../css/CreateAccount.scss";

import AuthContext from '../../store/auth-context';

function CreateAccountForm() {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;

    authCtx.signUp(enteredEmail, enteredPassword, enteredNickname);

    if (authCtx.isSuccess) {
      return navigate("/", { replace: true });
    }
  }

  return (
    <div className="container">
      {/* <div className='col-sm-0 col-lg-1'></div> */}
      <div className='create_account_form'>
        <h1>회원 가입</h1>
        <form onSubmit={submitHandler}>
          <div className="account_email">
            <label htmlFor="email">이메일 주소</label>
            <input type="email" id='email' required ref={emailInputRef} />
          </div>
          <div className="account_password">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id='password' required ref={passwordInputRef} />
          </div>
          <div className="account_nickname">
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" required ref={nicknameInputRef} />
          </div>
          <div className="submit_button">
            <button className='btn btn-primary' type='submit'>회원 가입</button>
          </div>
        </form>
      </div>
      {/* <div className='col-sm-0 col-lg-1'></div> */}

    </div>
  )
}

export default CreateAccountForm