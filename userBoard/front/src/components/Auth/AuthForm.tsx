import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import ToasterContext from '../../ui/toaster-context';

function AuthForm() {
  const authCtx = useContext(AuthContext);
  const toasterCtx = useContext(ToasterContext);

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

      toasterCtx.getToasts({ text: "로그인 성공", type: "success" })
    } catch (event) {
      toasterCtx.getToasts({ text: "로그인 실패, 아이디와 패스워드를 확인해주세요.", type: "error" })
    }
    setIsLoading(false);

    if (authCtx.isSuccess) {
      navigate("/", { replace: true });
    }
  }

  return (
    <section className='auth_form'>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="auth_email">
          <label htmlFor="email">Your Email</label>
          <input type="email" id='email' required ref={emailInputRef} />
        </div>
        <div className="auth_password">
          <label htmlFor="password">Your Password</label>
          <input type="password" id='password' required ref={passwordInputRef} />
        </div>
        <div className="auth_button">
          <button type='submit'>Login</button>
          {isLoading && <p>Loading</p>}
          <p>Create Account</p>
        </div>
      </form>
    </section>
  )
}

export default AuthForm