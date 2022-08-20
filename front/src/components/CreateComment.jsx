import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import { DisplayError } from '../utils/Atoms/DisplayError'
import useComponentVisible from '../utils/hooks/useComponentVisible'
import './styles/CreatePost.css'

export function CreateComment({ postId, comment, commentNeedReRender, setModifyActive, commentsNumber, setCommentsNumber }) {
  const { userDetails } = useAuth()
  const [isEmptyComment, setEmptyComment] = useState(comment ? false : true)
  const [textValue, setTextValue] = useState(comment ? comment.text : '')
  const [file, setFile] = useState(false)
  const [imageUrl, setImageUrl] = useState(comment ? comment.imageUrl : null)
  const {
    ref,
    isComponentVisible: isAnError,
    setIsComponentVisible: setError,
  } = useComponentVisible(true)

  const handleText = (e) => {
    setTextValue(e.target.value)
    e.target.value ? setEmptyComment(false) : !imageUrl && setEmptyComment(true)
  }
  const handleAddImage = (e) => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setEmptyComment(false)
  }
  const handleDeleteImage = () => {
    setFile(false)
    setImageUrl(null)
    textValue === '' && setEmptyComment(true)
  }
  const handleSubmit = async (e, method) => {
    e.preventDefault()
    const urlPath = comment ? comment.id : ''
    let data = comment
      ? { text: textValue, imageUrl: imageUrl }
      : { text: textValue }
    let isMultipartFormData = false
    if (file) {
      isMultipartFormData = true
      data = new FormData()
      data.append('post', JSON.stringify({ text: textValue }))
      data.append('image', file)
    }
    if (!comment) {
      setFile(false)
      setTextValue('')
      setImageUrl(null)
      setCommentsNumber(commentsNumber + 1)
    }
    const { error } = await doFetch({
      method: method,
      url: `http://localhost:3000/api/posts/${postId}/comment/${urlPath}`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    if (comment && error) {
      setError(error)
    }
    if (comment && !error) setModifyActive(false)
    setEmptyComment(true)
    error ? setError(error) : commentNeedReRender()
  }
  return (
    <form className={comment ? "modify-comment": "create-comment"} ref={ref}>
      {isAnError && (
        <DisplayError message={isAnError} setError={setError} ref={ref} />
      )}
      {comment && (
        <>
          <h3>Modification du commentaire</h3>
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
        <div className="create-post__image--container">
          <output
            htmlFor={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : 'create-comment__actions--image-input'
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
        </div>
      )}
      <div className="create-comment__text-actions">
        <div
          className="create-post__grow-wrap create-comment__textarea"
          data-replicated-value={textValue}
        >
          <textarea
            name="create-post"
            id="create-post"
            onInput={(e) => handleText(e)}
            placeholder="Voulez vous ajouter quelque chose ?"
            value={textValue}
          ></textarea>
        </div>
        <div className="create-post__actions">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            id={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : 'create-coment__actions--image-input'
            }
            onInput={(e) => handleAddImage(e)}
          />
          <label
            htmlFor={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : 'create-coment__actions--image-input'
            }
            className="create-post__actions--image"
          >
            <svg viewBox="0 0 24 24">
              <use href="#image-logo" />
            </svg>
          </label>
          {comment ? (
            <button
              className={isEmptyComment ? 'accent inactive' : 'accent'}
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                !isEmptyComment && handleSubmit(e, 'PUT')
              }}
            >
              Modifier
            </button>
          ) : (
            <button
              className={isEmptyComment ? 'accent inactive' : 'accent'}
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                !isEmptyComment && handleSubmit(e, 'POST')
              }}
            >
              Commenter
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
