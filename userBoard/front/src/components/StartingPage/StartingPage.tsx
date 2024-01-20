import { ArrowForwardIos } from '@mui/icons-material';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../../css/StartingPage.scss";
import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';

type ArticleInfo = {
	articleId: number,
	memberNickname: string,
	articleTitle: string,
	articleBody?: string,
	createdAt: string,
	updatedAt?: string,
	isWritten?: boolean
}

function StartingPage() {
	const authCtx = useContext(AuthContext);

	let isLogin = authCtx.isLogin
	let isGet = authCtx.isGetSuccess
	const articleCtx = useContext(ArticleContext);

	const [nickname, setNickname] = useState('');
	const [AList, setAList] = useState<ArticleInfo[]>([]);

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

	const fetchListHandler = useCallback(
		() => {
			articleCtx.getResentPageList();
		}, [],)

	useEffect(() => {
		fetchListHandler();
	}, [fetchListHandler])

	const fetchArticleData = useCallback(() => {
		if (articleCtx.isSuccess) {
			setAList(articleCtx.page);
			console.log(AList);
		}
	}, [articleCtx])

	useEffect(() => {
		fetchArticleData();
	}, [fetchArticleData])

	const articleList = AList.map((list) => {
		return (
			<tr key={list.articleId}>
				<td><Link to={`/article/${list.articleId}`} className="article_title" >{list.articleTitle}</Link></td>
				<td className='updated_date text-right'>{list.updatedAt}</td>
			</tr>
		)
	})

	return (
		<div className="container">
			{!isLogin ?
				<div className='main_guest'>
					<p>홈페이지 방문을 환영합니다 !!</p>
					{/* <a href="./page/1">게시판으로 이동 <ArrowForward className='arrow_icon' /></a> */}
				</div> :
				<div className='main_user'>
					<p>{nickname} 님 환영합니다!</p>
					{/* <a href="./page/1">게시판으로 이동 =&gt;</a> */}
				</div>
			}
			<div className="row gy-4 start_page">
				<div className="col-sm-6 main_column">
					<div className="main_box">
						<div className="title">
							<Link to="/page/1">
								<h1>게시판</h1>
								<span><ArrowForwardIos /></span>
							</Link>
						</div>
						<div className="content">
							<table>
								<tbody>
									{articleList}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="col-sm-6 main_column">
					<div className="main_box">
						<div className="title">
							<Link to="/movie">
								<h1>Movie Info</h1>
								<span><ArrowForwardIos /></span>
							</Link>
						</div>
						<div className="content">작성된 글이 없습니다.</div>
					</div>
				</div>

			</div>

			<div className="row gy-4">

				<div className="col-sm-6 main_column">
					<div className="main_box">
						<div className="title">
							<Link to="#">
								<h1>게시판3</h1>
								<span><ArrowForwardIos /></span>
							</Link>
						</div>
						<div className="content">작성된 글이 없습니다.</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default StartingPage