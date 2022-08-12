import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import './styles/CreatePost.css'
import './styles/Login.css'

export function CreatePost({ post, needReRender, setModifyActive }) {
  const { userDetails } = useAuth()
  const [textValue, setTextValue] = useState(post ? post.text : '')
  const [file, setFile] = useState(false)
  const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : null)
  const handleAddImage = (e) => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  const handleDeleteImage = () => {
    setFile(false)
    setImageUrl(null)
  }
  const handleSubmit = async (e, method) => {
    e.preventDefault()
    const urlPath = post ? post.id : ''
    let data = post
      ? { text: textValue, imageUrl: imageUrl }
      : { text: textValue }
    let isMultipartFormData = false
    if (file) {
      isMultipartFormData = true
      data = new FormData()
      data.append('post', JSON.stringify({ text: textValue }))
      data.append('image', file)
    }
    if (!post) {
      setFile(false)
      setTextValue('')
      setImageUrl(null)
      console.log('Enleve le texte ?')
    }
    const { error } = await doFetch({
      method: method,
      url: `http://localhost:3000/api/posts/${urlPath}`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    if (post) setModifyActive(false)
    error ? console.error(error) : needReRender()
  }
  return (
    <form className="create-post">
      {post && (
        <>
          <h3>Modification du post</h3>
          <svg
            viewBox="0 0 24 24"
            className="create-post__image--delete"
            onClick={() => setModifyActive(false)}
          >
            <use href="#circle-cross" />
          </svg>
        </>
      )}
      {(file || imageUrl) && (
        <output
          htmlFor={
            post
              ? `update-post-${post.id}__actions--image-input`
              : 'create-post__actions--image-input'
          }
          className="create-post__image"
        >
          <img src={imageUrl} />
          <svg
            viewBox="0 0 24 24"
            className="create-post__image--delete"
            onClick={handleDeleteImage}
          >
            <use href="#circle-cross" />
          </svg>
        </output>
      )}
      <div className="create-post__grow-wrap" data-replicated-value={textValue}>
        <textarea
          name="create-post"
          id="create-post"
          onInput={(e) => setTextValue(e.target.value)}
          placeholder={
            post
              ? 'Voulez vous ajouter quelque chose ?'
              : "Quoi de neuf aujourd'hui ?"
          }
          value={textValue}
        ></textarea>
      </div>
      <div className="create-post__actions">
        <input
          type="file"
          id={
            post
              ? `update-post-${post.id}__actions--image-input`
              : 'create-post__actions--image-input'
          }
          onInput={(e) => handleAddImage(e)}
        />
        <label
          htmlFor={
            post
              ? `update-post-${post.id}__actions--image-input`
              : 'create-post__actions--image-input'
          }
          className="create-post__actions--image"
        >
          <p className='create-post__actions--image--text'>Ajouter une<br/>image</p>
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
        {post ? (
          <button
            className="accent"
            type="submit"
            onClick={(e) => handleSubmit(e, 'PUT')}
          >
            Modifier
          </button>
        ) : (
          <button
            className="accent"
            type="submit"
            onClick={(e) => handleSubmit(e, 'POST')}
          >
            Publier
          </button>
        )}
      </div>
    </form>
  )
}
