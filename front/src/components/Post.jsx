import './styles/Post.css'
import { Like } from './Like.jsx'
import { UserName } from '../utils/Atoms/UserName'
import useAuth from '../utils/hooks/useAuth'
import { useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import { CreatePost as ModifyPost } from './CreatePost'
import { useNavigate } from 'react-router-dom'
import { DisplayError } from '../utils/Atoms/DisplayError'

export function Post({ post, index, needReRender }) {
  const { userDetails } = useAuth()
  const navigate = useNavigate()
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [showAllUserLike, setShowAllUserLike] = useState(false)
  const [isModifyActive, setModifyActive] = useState(false)
  const animationDelay = (index + 1) * 200
  const handleDeletePost = async () => {
    const { error } = await doFetch({
      method: 'DELETE',
      url: `http://localhost:3000/api/posts/${post.id}`,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    error ? <DisplayError /> : needReRender()
  }
  const DisplayUsersWhoLikes = () => {
    return post.userlikes.map((like, index) => {
      return (
        <span key={`userlike-${index}`}>
          {index > 0 && <span>, </span>}
          <span className="post__text--userlikes--name">
            <UserName user={like.user} isShowingDepartement={false} />
          </span>
        </span>
      )
    })
  }
  return (
    <div className="post" key={post.id} 
    style={{animationDelay: `${animationDelay}ms`}}>
      <div
        className="post__user"
        onClick={() => navigate(`/profile/${post.userId}`)}
      >
        <UserName user={post.user} isShowingDepartement={true} />
        <div>
          {new Date(post.date).toLocaleString('fr', {
            timeStyle: 'medium',
            dateStyle: 'full',
          })}
        </div>
      </div>
      {isModifyActive ? (
        <ModifyPost
          post={post}
          needReRender={needReRender}
          setModifyActive={setModifyActive}
          onBlur={() => setModifyActive(false)}
        />
      ) : (
        <>
          {post.imageUrl && <img src={post.imageUrl} className="post__image" />}
          {post.text !== '' || post.modified ? (
            <p className="post__text">
              {post.text !== '' && post.text}
              {post.modified && (
                <span className="post__text__modified"> (modifié) </span>
              )}
            </p>
          ) : null}
        </>
      )}
      {post.userlikes.length > 0 && (
        <p
          className={
            showAllUserLike
              ? 'post__text--userlikes post__text'
              : 'post__text--userlikes post__text post__text--userlikes--inOneLign'
          }
          onClick={() => setShowAllUserLike(!showAllUserLike)}
        >
          Aimé par: <DisplayUsersWhoLikes />
        </p>
      )}
      <div className="post__footer">
        <Like
          likes={post.likes}
          userlikes={post.userlikes}
          id={post.id}
          needReRender={needReRender}
        />
        {userDetails.userId === post.userId || userDetails.role === 'admin' ? (
          <>
            <div
              className="post__action"
              onClick={() => setModifyActive(!isModifyActive)}
            >
              <div className="post__action--icon">
                <svg viewBox="0 0 24 24">
                  <use href="#pen" />
                </svg>
              </div>
              <p className="post__action--text">Modifier</p>
            </div>
            <div
              className="post__action"
              onClick={() =>
                setShowConfirmationMessage(!showConfirmationMessage)
              }
            >
              <div className="post__action--icon">
                <svg viewBox="0 0 24 24">
                  <use href="#trash" />
                </svg>
              </div>
              <p className="post__action--text">Supprimer</p>
            </div>
          </>
        ) : null}
      </div>
      {showConfirmationMessage ? (
        <div className="post__confirmation-message">
          <p className="post__confirmation-message__text">
            Voulez-vous vraiment supprimer ce post ?
          </p>
          <div className="post__confirmation-message__response">
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
