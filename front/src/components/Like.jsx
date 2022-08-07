import useAuth from '../utils/hooks/useAuth'

export function Like({ likes, userlikes }) {
  const { userDetails } = useAuth()
console.log(userlikes)
  return (
    <div
      className={
        userlikes.some(user => user.user_id === userDetails.userId) ? 'post__like liked' : 'post__like'
      }
    >
      <svg
        className="post__like--heart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.574-1.635-4.46-2.135-6.035-.5-1.573 1.635-1.34 3.836 0 5.752C7.306 15.168 9.41 16.89 12 19c2.59-2.11 4.694-3.832 6.035-5.748 1.34-1.916 1.573-4.117 0-5.752C16.46 5.865 13.574 6.365 12 8Z"
        />
      </svg>
      <span className="post__like--number">{likes}</span>
    </div>
  )
}