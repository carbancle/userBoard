import React, { useState, useEffect, useCallback, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import CommentContext from '../../store/comment-context'
import ToasterContext from '../../ui/toaster-context'
import Comment from './Comment'
import { Forum } from '@mui/icons-material'

type CommentInfo = {
  commentId: number,
  memberNickname: string,
  commentBody: string,
  createdAt: Date,
  written: boolean,
  onDelete?: (id: string) => void
}

type PostComment = {
  articleId: string,
  body: string
}

function CommentList(props: any) {
  const [comments, setComments] = useState<CommentInfo[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const authCtx = useContext(AuthContext);
  const commentCtx = useContext(CommentContext);
  const toasterCtx = useContext(ToasterContext);

  let isLogin = authCtx.isLogin;
  let isSuccess = commentCtx.isSuccess;
  const token = authCtx.token;
  const articleId = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? commentCtx.getComments(articleId, authCtx.token) : commentCtx.getComments(articleId));
    console.log("get comment");
  }, [isLogin])

  useEffect(() => {
    getContext()
  }, [getContext])

  useEffect(() => {
    if (isSuccess) {
      setComments(commentCtx.commentList)
      console.log(comments);
      setIsLoading(true);
    }
  }, [isSuccess])

  const createComment = (event: React.FormEvent) => {
    event.preventDefault();
    const comment: PostComment = {
      articleId: articleId,
      body: commentRef.current!.value
    }

    commentCtx.createComment(comment, token);
    toasterCtx.getToasts({ text: "댓글 등록 완료", type: "success" });
  }

  const deleteComment = (commentId: string) => {
    // commentId = Comment의 deleteId 값
    // articleId = ArticleOne 페이지의 article_id 값
    commentCtx.deleteComment(commentId, articleId, token);
  }

  let media = <h3>is Loading...</h3>

  if (isLoading && comments) {
    if (comments!.length > 0) {
      console.log("if start", comments);
      media = (
        <>
          <span className='title'><Forum /> 댓글</span>
          <ul>
            {comments.map((comment) => {
              return (
                <Comment key={comment.commentId}
                  commentId={comment.commentId}
                  memberNickname={comment.memberNickname}
                  commentBody={comment.commentBody}
                  createdAt={comment.createdAt}
                  written={comment.written}
                  onDelete={deleteComment}
                />
              )
            })}
          </ul>
        </>
      )
    } else {
      console.log("if fail", comments);
      media = <div></div>
    }
  }

  return (
    <div className='comment_list'>
      {media}
      {isLogin &&
        <form onSubmit={createComment} className="comment_submit">
          <label className='comment_nickname'>{authCtx.userObj.nickname}</label>
          <textarea name="comment" className='comment_area' cols={100} rows={3} ref={commentRef}></textarea>
          <input type="submit" className='submit_btn' />
        </form>
      }
    </div>
  )
}

export default CommentList