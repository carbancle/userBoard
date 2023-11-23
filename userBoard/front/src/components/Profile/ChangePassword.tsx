import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context'

function ChangePassword() {
  const authCtx = useContext(AuthContext);

  let navigate = useNavigate();

  const exPasswordInpurRef = useRef<HTMLInputElement>(null);
  const newPasswordInpurRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainInpurRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredExPassword = exPasswordInpurRef.current!.value;
    const enteredNewPassword = newPasswordInpurRef.current!.value;
    const enteredNewPasswordAgain = newPasswordAgainInpurRef.current!.value;

    if (enteredNewPassword !== enteredNewPasswordAgain) {
      alert("Password Write Correct!");
      return
    }
    console.log('change pw start!');
    authCtx.changePassword(enteredExPassword, enteredNewPassword);
    console.log(authCtx.isSuccess);
    if (authCtx.isSuccess) {
      alert("비밀번호가 변경되었습니다. 변경된 비밀번호로 다시 로그인 해주세요.");
      authCtx.logout();
      navigate("/", { replace: true });
    }
  }
  return (
    <form className='change_password' onSubmit={submitHandler}>
      <div className="ex_pwd">
        <label htmlFor="ex_password">Old Password</label>
        <input type="password" id='ex_password' minLength={8} ref={exPasswordInpurRef} />
      </div>
      <div className="new_pwd">
        <label htmlFor="new_password">New Password</label>
        <input type="password" id='new_password' minLength={8} ref={newPasswordInpurRef} />
      </div>
      <div className="again_pwd">
        <label htmlFor="again_password">New Password</label>
        <input type="password" id='again_password' minLength={8} ref={newPasswordAgainInpurRef} />
      </div>
      <div className="change_button">
        <button type='submit'>Change Password</button>
      </div>
    </form>
  )
}

export { ChangePassword }