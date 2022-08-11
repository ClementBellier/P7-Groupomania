import { useState } from 'react'
import { CreatePost } from '../components/CreatePost'
import { PostList } from '../components/PostsList'
import { useParams } from 'react-router-dom'

export function Profile() {
  const { userId } = useParams()
  const [isNeedReRender, setIsNeedReRender] = useState(false)
  const needReRender = () => {
    setIsNeedReRender(!isNeedReRender)
  }

  return (
    <>
      <CreatePost needReRender={needReRender} />
      <PostList needReRender={needReRender} userId={userId} />
    </>
  )
}
