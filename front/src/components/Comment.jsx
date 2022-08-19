import { UserName } from '../utils/Atoms/UserName'
import './styles/Comment.css'

export function Comment({ comment, index }) {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-content__user">
          <UserName user={comment.user} isShowingDepartement={false} />
        </div>
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
          <div className="comment-content__likes">
            <svg className="comment-content__likes--heart" viewBox="0 0 24 24">
              <use href="#heart" />
            </svg>
            <span>{comment.likes}</span>
          </div>
        )}
      </div>
    </div>
  )
}
