import { useState } from 'react'
import { PostList } from '../components/PostsList'
import { useParams } from 'react-router-dom'
import { UserDetails } from '../components/UserDetails'

export function Profile() {
  const { userId } = useParams()
  const [isNeedReRender, setIsNeedReRender] = useState(false)
  const needReRender = () => {
    setIsNeedReRender(!isNeedReRender)
  }

  return (
    <>
      <UserDetails userId={userId} />
      <PostList needReRender={needReRender} userId={userId} />
    </>
  )
}
