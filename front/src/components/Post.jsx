import './styles/Post.css'

export function Post(post) {
  return (
    <div className="post" key={post.id}>
      <p className="post__user">{post.user.email}</p>
      {post.text !== '' && <p className='post__text'>{post.text}</p>}
      {post.imageUrl && <img src={post.imageUrl} className="post__image" />}
      <div className="post__like">
        <svg
          className="post__like--heart"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.574-1.635-4.46-2.135-6.035-.5-1.573 1.635-1.34 3.836 0 5.752C7.306 15.168 9.41 16.89 12 19c2.59-2.11 4.694-3.832 6.035-5.748 1.34-1.916 1.573-4.117 0-5.752C16.46 5.865 13.574 6.365 12 8Z"
          />
        </svg>
        <span className="post__like--number">{post.likes}</span>
      </div>
    </div>
  )
}
