import { useState } from 'react'
import { PostList } from '../components/PostsList'
import { useNavigate, useParams } from 'react-router-dom'
import { UserDetails } from '../components/UserDetails'

export function Profile() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [isNeedReRender, setIsNeedReRender] = useState(false)
  const needReRender = () => {
    setIsNeedReRender(!isNeedReRender)
  }

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className="profile-go-back"
        onClick={() => navigate(-1)}
      >
        <use href="#arrow-left" />
      </svg>
      <UserDetails userId={userId} />
      <PostList needReRender={needReRender} userId={userId} />
    </>
  )
}
