import React, { useState, useContext, useRef, useCallback, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
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
    [articleCtx.article, articleCtx.isGetUpdateSuccess],
  )

  useEffect(() => {
    if (props.item) {
      return () => {
        articleCtx.getUpdateArticle(authCtx.token, props.item)
      }
    }
    return;
  }, [articleCtx, authCtx.token, props.item])

  useEffect(() => {
    console.log('update effect')
    setUpdateArticleHandler();
  }, [setUpdateArticleHandler])

  useEffect(() => {
    if (articleCtx.isSuccess) {
      return () => {
        console.log('writing success')
        navigate("/page/1", { replace: true })
      }
    }
    return;
  }, [articleCtx.isSuccess, navigate])

  return (
    <div className='create_article_form'>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text" placeholder='제목을 입력하세요' required ref={titleRef} defaultValue={updateArticle.title}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea" rows={20} required ref={mainRef} defaultValue={updateArticle.body}
          />
        </Form.Group>
        <br />
        <Button variant='cancel'>취소</Button>
        <Button variant='primary' type='submit'>작성</Button>
      </Form>
    </div>
  )
}

export default CreateArticleForm