import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import '../../css/MainNavigation.scss';

import AuthContext from '../../store/auth-context'

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  let isLogin = authCtx.isLogin;
  let isGet = authCtx.isGetSuccess;

  const callback = (str: string) => {
    setNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      return (() => {
        console.log('start');
        authCtx.getUser();
      })
    }
    return;
  }, [isLogin])

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.nickname);
    }
  }, [isGet])

  const toggleLogoutHandler = () => {
    authCtx.logout();
  }


  return (
    <header className='main_navigation'>
      <div className="container">
        <Link to='/'><div className='logo'>Home</div></Link>
        <nav>
          <ul>
            {!isLogin && <li><Link to='/login'>Login</Link></li>}
            {!isLogin && <li><Link to='/sign_up'>Sign-Up</Link></li>}
            {isLogin && <li><Link to='/profile'>{nickname}</Link></li>}
            {isLogin && <li><button onClick={toggleLogoutHandler}>logout</button></li>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainNavigation