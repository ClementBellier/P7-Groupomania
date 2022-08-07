import useAuth from '../utils/hooks/useAuth'
import { useFetch } from '../utils/hooks/useFetch'
import { Post } from './Post'

export function PostList() {
  const { userDetails } = useAuth()
  const { data, isLoading, error } = useFetch({
    method: 'GET',
    url: 'http://localhost:3000/api/posts/',
    token: userDetails.token,
  })

  if (error) {
    return <span> Oups, il y a eu une erreur</span>
  }

  return (
    <>
      {isLoading ? <p>En chargement</p> : data.map((post) => Post(post))}
    </>
  )
}
