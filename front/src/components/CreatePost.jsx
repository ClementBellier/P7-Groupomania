import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import './styles/CreatePost.css'
import './styles/Login.css'
import { DisplayError } from '../utils/Atoms/DisplayError'

export function CreatePost({ post, needReRender, setModifyActive }) {
  const { userDetails } = useAuth()
  const [isEmptyPost, setEmptyPost] = useState(post ? false : true)
  const [textValue, setTextValue] = useState(post ? post.text : '')
  const [file, setFile] = useState(false)
  const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : null)
  const handleText = (e) => {
    setTextValue(e.target.value)
    e.target.value ? setEmptyPost(false) : !imageUrl && setEmptyPost(true)
  }
  const handleAddImage = (e) => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setEmptyPost(false)
  }
  const handleDeleteImage = () => {
    setFile(false)
    setImageUrl(null)
    textValue === '' && setEmptyPost(true)
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
    }
    const { error } = await doFetch({
      method: method,
      url: `http://localhost:3000/api/posts/${urlPath}`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    if (post) setModifyActive(false)
    error ? <DisplayError /> : needReRender()
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
          onInput={(e) => handleText(e)}
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
          <p className="create-post__actions--image--text">
            Ajouter une
            <br />
            image
          </p>
          <svg viewBox="0 0 24 24">
            <use href="#image-logo" />
          </svg>
        </label>
        {post ? (
          <button
            className={isEmptyPost ? 'accent inactive' : 'accent'}
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              !isEmptyPost && handleSubmit(e, 'PUT')
            }}
          >
            Modifier
          </button>
        ) : (
          <button
            className={isEmptyPost ? 'accent inactive' : 'accent'}
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              !isEmptyPost && handleSubmit(e, 'POST')
            }}
          >
            Publier
          </button>
        )}
      </div>
    </form>
  )
}
