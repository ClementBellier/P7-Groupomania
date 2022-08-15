import { useEffect, useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import useAuth from '../utils/hooks/useAuth'
import { Post } from './Post'
import { Loader } from '../components/Loader'
import { DisplayError } from '../utils/Atoms/DisplayError'

export function PostList({ needReRender, userId }) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { userDetails } = useAuth()

  useEffect(() => {
    const urlToFetch = userId
      ? `http://localhost:3000/api/users/${userId}/posts`
      : 'http://localhost:3000/api/posts/'
    const fetchData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: urlToFetch,
        token: userDetails.token,
      })
      setData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchData()
  }, [needReRender])

  if (error) return <DisplayError />

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data.length === 0 ? (
        <p style={{ textAlign: 'center', marginBlock: '30px' }}>
          Il n'y a aucun post à afficher... 😞
        </p>
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
