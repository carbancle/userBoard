import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../store/auth-context';

function StartingPage() {
	const authCtx = useContext(AuthContext);

	let isLogin = authCtx.isLogin
	let isGet = authCtx.isGetSuccess

	const [nickname, setNickname] = useState('');

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

	return (
		<div className="container">
			{!isLogin ?
				<div className='main_guest'>
					<p>홈페이지 방문을 환영합니다 !!</p>
					<a href="./page/1">게시판으로 이동</a>
				</div> :
				<div className='main_user'>
					<p>{nickname} 님 환영합니다!</p>
					<a href="./page/1">게시판으로 이동</a>
				</div>
			}
		</div>
	)
}

export default StartingPage