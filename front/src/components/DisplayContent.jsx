import './styles/Post.css'
import './styles/Comment.css'
import { CONTENT as TEXT } from '../../public/assets/texts/texts'

export function DisplayContent({ data }) {
  const isComment = data.postId ? true : false
  const suffixMissingAltText = isComment
    ? TEXT.MISSING_COMMENT
    : TEXT.MISSING_POST
  const missingAltText = `${TEXT.MISSING_ALT_TEXT} ${suffixMissingAltText} ${data.id}`
  const imageNotExists = url => {
    const http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send()
    return http.status === 404
  }
  const DisplayImage = () => {
    if (imageNotExists(data.imageUrl)) {
      return (
        <div className="missing-image">
          <svg alt="">
            <use href="#no-image" />
          </svg>
          {`Accès à l'image impossible\n${
            data.altText ? data.altText : missingAltText
          }`}
        </div>
      )
    }
    return (
      <img
        src={data.imageUrl}
        alt={data.altText ? data.altText : missingAltText}
        className={isComment ? 'comment-content__image' : 'post__image'}
      />
    )
  }
  return (
    <>
      {data.imageUrl && <DisplayImage />}
      {(data.text !== '' || data.modified) && (
        <p className={isComment ? 'comment-content__text' : 'post__text'}>
          {data.text !== '' && data.text}
          {data.modified && (
            <span
              className={
                isComment
                  ? 'comment-content__text--modified'
                  : 'post__text__modified'
              }
            >
              {TEXT.MODIFIED}
            </span>
          )}
        </p>
      )}
    </>
  )
}
