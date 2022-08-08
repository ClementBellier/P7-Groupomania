import './styles/Post.css'
import { Like } from './Like.jsx'
import { UserName } from '../utils/Atoms/UserName'

export function Post(post) {
  return (
    <div className="post" key={post.id}>
      <div className="post__user"><UserName user={post.user} /></div>
      {/* <div >{post.user.email}</div> */}
      {post.imageUrl && <img src={post.imageUrl} className="post__image" />}
      {post.text !== '' && <p className="post__text">{post.text}</p>}
      <Like likes={post.likes} userlikes={post.userlikes} />
    </div>
  )
}
