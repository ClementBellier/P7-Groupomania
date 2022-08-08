export async function doFetch({ method, url, body, token }) {
  let data = {}
  let isLoading = true
  let error = false
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
  try{
    const response = await fetch(url, requestOptions)
    data = await response.json()
    isLoading = false
  }
  catch(errorCatched){
    error = errorCatched
  }
  return {
    isLoading,
    data,
    error,
  }
}