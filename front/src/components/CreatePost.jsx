import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import './styles/CreatePost.css'
import './styles/Login.css'

export function CreatePost({ needReRender }) {
  const { userDetails } = useAuth()
  const [textValue, setTextValue] = useState('')
  const [file, setFile] = useState(false)
  const handleAddImage = (e) => {
    setFile(e.target.files[0])
  }
  const handleDeleteImage = () => {
    setFile(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = { text: textValue }
    let isMultipartFormData = false
    if (file) {
      isMultipartFormData = true
      data = new FormData()
      data.append('post', JSON.stringify({ text: textValue }))
      data.append('image', file)
    }
    const { error } = await doFetch({
      method: 'POST',
      url: `http://localhost:3000/api/posts/`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    setTextValue('')
    setFile(false)
    error ? console.error(error) : needReRender()
  }
  return (
    <form className="create-post">
      {file && (
        <div className="create-post__image">
          <img src={URL.createObjectURL(file)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={handleDeleteImage}
          >
            <g stroke="currentColor" strokeLinecap="round">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
              <path d="M9 15L15 9M15 15L9 9" />
            </g>
          </svg>
        </div>
      )}
      <div className="create-post__grow-wrap" data-replicated-value={textValue}>
        <textarea
          name="create-post"
          id="create-post"
          onInput={(e) => setTextValue(e.target.value)}
          placeholder="Quoi de neuf aujourd'hui ?"
        ></textarea>
      </div>
      <div className="create-post__actions">
        <input
          type="file"
          id="create-post__actions--image-input"
          onInput={(e) => handleAddImage(e)}
        />
        <label
          htmlFor="create-post__actions--image-input"
          className="create-post__actions--image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m21 17-3.293-3.293a1 1 0 0 0-1.414 0l-.586.586a1 1 0 0 1-1.414 0l-2.879-2.879a2 2 0 0 0-2.828 0L3 17M21 5v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1Zm-5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>
        </label>
        <button
          className="accent"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Publier
        </button>
      </div>
    </form>
  )
}
