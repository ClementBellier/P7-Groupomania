import './styles/Post.css'
import './styles/Comment.css'
import { CONTENT as TEXT } from '../../public/assets/texts/texts'

export function DisplayContent({ data }) {
  const isComment = data.postId ? true : false
  return (
    <>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          className={isComment ? 'comment-content__image' : 'post__image'}
        />
      )}
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
