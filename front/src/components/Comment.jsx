import { useState } from 'react'
import { UserName } from '../utils/Atoms/UserName'
import './styles/Comment.css'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import { CreateComment } from './CreateComment'

export function Comment({ comment, index, commentNeedReRender, commentsNumber, setCommentsNumber }) {
  const { userDetails } = useAuth()
  const [commentLikes, setCommentLikes] = useState(comment.likes)
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [isModifyActive, setModifyActive] = useState(false)
  const [userLikedThisComment, setUserLikedThisComment] = useState(
    comment.commentlikes.some((user) => user.userId === userDetails.userId)
  )
  const handleLike = () => {
    const likeFetchBody = { like: userLikedThisComment ? 0 : 1 }
    doFetch({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${comment.postId}/comment/${comment.id}/like`,
      body: likeFetchBody,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    setUserLikedThisComment(!userLikedThisComment)
    userLikedThisComment
      ? setCommentLikes(commentLikes - 1)
      : setCommentLikes(commentLikes + 1)
    commentNeedReRender()
  }
  const handleDeletePost = async () => {
    const { error } = await doFetch({
      method: 'DELETE',
      url: `http://localhost:3000/api/posts/${comment.postId}/comment/${comment.id}`,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    error ? console.log(error) : (setCommentsNumber(commentsNumber - 1), commentNeedReRender())
  }
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-content__user">
          <UserName user={comment.user} isShowingDepartement={false} />
        </div>
        {isModifyActive ? (
          <CreateComment
            postId={comment.postId}
            comment={comment}
            commentNeedReRender={commentNeedReRender}
            setModifyActive={setModifyActive}
            onBlur={() => setModifyActive(false)}
          />
        ) : (
          <>
            {comment.imageUrl && (
              <img src={comment.imageUrl} className="comment-content__image" />
            )}
            {comment.text !== '' || comment.modified ? (
              <p className="comment-content__text">
                {comment.text !== '' && comment.text}
                {comment.modified && (
                  <span className="comment-content__text--modified">
                    {'(modifié)'}
                  </span>
                )}
              </p>
            ) : null}
            {comment.likes > 0 && (
              <div className="comment-content__likes" onClick={handleLike}>
                <svg
                  className="comment-content__likes--heart"
                  viewBox="0 0 24 24"
                >
                  <use href="#heart" />
                </svg>
                <span>{commentLikes}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="comment-actions">
        <div onClick={handleLike}>
          {userLikedThisComment ? 'Ne plus aimer' : 'Aimer'}
        </div>
        {userDetails.userId === comment.userId ||
        userDetails.role === 'admin' ? (
          <>
            <div onClick={() => setModifyActive(!isModifyActive)}>Modifier</div>
            <div
              onClick={() =>
                setShowConfirmationMessage(!showConfirmationMessage)
              }
            >
              Supprimer
            </div>
          </>
        ) : null}
      </div>
      {showConfirmationMessage ? (
        <div className="comment__confirmation-message">
          <p className="comment__confirmation-message__text">
            Voulez-vous vraiment supprimer ce commentaire ?
          </p>
          <div className="comment__confirmation-message__response">
            <button className="accent" onClick={(e) => handleDeletePost(e)}>
              Oui
            </button>
            <button
              className="accent"
              onClick={() => setShowConfirmationMessage(false)}
            >
              Non
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
