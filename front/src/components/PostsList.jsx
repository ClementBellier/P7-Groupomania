import { useEffect, useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import useAuth from '../utils/hooks/useAuth'
import { Post } from './Post'

export function PostList({ needReRender }) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { userDetails } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: 'http://localhost:3000/api/posts/',
        token: userDetails.token,
      })
      setData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchData()
  }, [needReRender])

  if (error) {
    return <span> Oups, il y a eu une erreur</span>
  }

  return (
    <>
      {isLoading ? (
        <p>En chargement</p>
      ) : (
        data
          .sort((a, z) => z.date - a.date)
          .map((post) => (
            <Post
              key={`post-${post.id}`}
              post={post}
              needReRender={needReRender}
            />
          ))
      )}
    </>
  )
}
