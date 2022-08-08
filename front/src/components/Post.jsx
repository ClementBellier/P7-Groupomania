import './styles/Post.css'
import { Like } from './Like.jsx'
import { UserName } from '../utils/Atoms/UserName'
import useAuth from '../utils/hooks/useAuth'

export function Post(post) {
  const { userDetails } = useAuth()
  return (
    <div className="post" key={post.id}>
      <div className="post__user">
        <UserName user={post.user} isShowingDepartement={true} />
      </div>
      {post.imageUrl && <img src={post.imageUrl} className="post__image" />}
      <p className="post__text">{post.text !== '' && post.text}
      {post.modified && (
        <span className="post__text__modified"> (modifié) </span>
      )}</p>
      <div className="post__footer">
        <Like likes={post.likes} userlikes={post.userlikes} id={post.id} />
        {userDetails.userId === post.userId || userDetails.role === 'admin' ? (
          <>
            <div className="post__action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.5 7.5l3 3M4 20v-3.5L15.293 5.207a1 1 0 011.414 0l2.086 2.086a1 1 0 010 1.414L7.5 20H4z"
                />
              </svg>
              Modifier
            </div>
            <div className="post__action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6l.934 13.071A1 1 0 007.93 20h8.138a1 1 0 00.997-.929L18 6m-6 5v4m8-9H4m4.5 0l.544-1.632A2 2 0 0110.941 3h2.117a2 2 0 011.898 1.368L15.5 6"
                />
              </svg>
              Supprimer
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
