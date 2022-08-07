import './styles/Post.css'
import { Like } from './Like.jsx'

export function Post(post) {
  return (
    <div className="post" key={post.id}>
      <p className="post__user">{post.user.email}</p>
      {post.imageUrl && <img src={post.imageUrl} className="post__image" />}
      {post.text !== '' && <p className="post__text">{post.text}</p>}
      <Like likes={post.likes} userlikes={post.userlikes} />
    </div>
  )
}
