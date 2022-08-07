import { useEffect, useState } from 'react'

export function useFetch({method, url, body, token}) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const requestOptions = {
    method,
    headers: {},
  }
  if (body) {
    requestOptions.headers['Content-Type'] = 'application/json'
    requestOptions.body = JSON.stringify(body)
  }
  if (token) {
    requestOptions.headers['Authorization'] = 'Bearer ' + token
  }

  useEffect(() => {
    if (!url) return
    setLoading(true)
    async function fetchData() {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
        .catch((error) => setError(error))
    }
    fetchData()
  }, [])

  return {
    isLoading,
    data,
    error,
  }
}