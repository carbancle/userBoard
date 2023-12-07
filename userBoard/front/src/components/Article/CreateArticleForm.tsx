import React, { useState, useContext, useRef, useCallback, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import "../../css/CreateArticleForm.scss";
import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';

interface PostArticle {
  id?: string,
  title: string,
  body: string
}

function CreateArticleForm(props: any) {
  let navigate = useNavigate();

  const [updateArticle, setUpdateArticle] = useState<PostArticle>({ title: '', body: '' });

  const articleCtx = useContext(ArticleContext);
  const authCtx = useContext(AuthContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let postArticle: PostArticle = {
      title: titleRef.current!.value,
      body: mainRef.current!.value
    }

    if (props.item) {
      console.log('update');
      postArticle = { ...postArticle, id: props.item }
    }

    (props.item ? articleCtx.updateArticle(authCtx.token, postArticle) : articleCtx.createArticle(postArticle, authCtx.token))
  }

  const setUpdateArticleHandler = useCallback(
    () => {
      if (articleCtx.isGetUpdateSuccess) {
        setUpdateArticle({
          title: articleCtx.article!.articleTitle,
          body: articleCtx.article!.articleBody
        })
      }
    },
    [articleCtx.isGetUpdateSuccess],
  )

  useEffect(() => {
    if (props.item) {
      articleCtx.getUpdateArticle(authCtx.token, props.item)
    }
  }, [props.item])

  useEffect(() => {
    console.log('update effect')
    setUpdateArticleHandler();
  }, [setUpdateArticleHandler])

  useEffect(() => {
    if (articleCtx.isWriting) {
      console.log('writing success')
      alert("글이 등록되었습니다")
      navigate("/page/1", { replace: true })
    }

    if (articleCtx.isUpdating) {
      console.log('updating success')
      alert("글이 수정되었습니다")
      navigate("/page/1", { replace: true })
    }
  }, [articleCtx.isWriting, articleCtx.isUpdating])

  return (
    <div className='create_article_form'>
      <div className="container">
        <h1>글쓰기</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='title'>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text" placeholder='제목을 입력하세요' required ref={titleRef} defaultValue={updateArticle.title}
            />
          </Form.Group>
          <Form.Group className='content'>
            <Form.Label>본문</Form.Label>
            <Form.Control
              as="textarea" rows={20} required ref={mainRef} defaultValue={updateArticle.body}
            />
          </Form.Group>
          <br />
          <div className='button_box'>
            <Button variant='cancel'>취소</Button>
            <Button variant='primary' type='submit'>작성</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateArticleForm