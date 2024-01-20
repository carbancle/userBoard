import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../css/AuthForm.scss";
import AuthContext from '../../store/auth-context';
import ToasterContext from '../../ui/toaster-context';

function AuthForm() {
  const authCtx = useContext(AuthContext);
  // const toasterCtx = useContext(ToasterContext);

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    setIsLoading(true);
    try {
      authCtx.login(enteredEmail, enteredPassword);

      // toasterCtx.getToasts({ text: "로그인 성공", type: "success" })
      if (authCtx.isSuccess) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message)
      } else {
        alert("ID가 존재하지 않거나 비밀번호가 일치하지 않습니다.")
      }
    }
    setIsLoading(false);


  }

  return (
    <div className="container">
      <section className='auth_form'>
        <h1>로그인</h1>
        <form onSubmit={submitHandler}>
          <div className="auth_email">
            <label htmlFor="email">이메일</label>
            <input type="email" id='email' required ref={emailInputRef} />
          </div>
          <div className="auth_password">
            <label htmlFor="password">패스워드</label>
            <input type="password" id='password' required ref={passwordInputRef} />
          </div>
          <div className="auth_button">
            <a className='btn btn-warning' href="sign_up">회원 가입</a>
            <button className='btn btn-primary' type='submit'>로그인</button>
            {isLoading && <p>Loading...</p>}
          </div>
        </form>
      </section>
    </div>
  )
}

export default AuthForm