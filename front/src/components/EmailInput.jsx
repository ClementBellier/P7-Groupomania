import { useState } from 'react'
import { EMAIL_INPUT as TEXT} from '../../public/assets/texts/fr-FR'

export function EmailInput({
  email,
  setEmail,
  isLoginActive,
  isAnErrorInMail,
  setIsAnErrorInMail,
  setErrorMessage,
}) {
  const [isOnFocus, setIsOnFocus] = useState(false)

  const handleEmailInput = (value) => {
    setErrorMessage()
    setEmail(value)
    !TEXT.REGEXP.test(value)
      ? setIsAnErrorInMail(true)
      : setIsAnErrorInMail(false)
  }

  return (
    <>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => handleEmailInput(e.target.value)}
        onFocus={() => setIsOnFocus(true)}
        pattern={TEXT.REGEXP}
        placeholder={TEXT.PLACEHOLDER}
        required
      />
      {!isLoginActive && isOnFocus && email.length !== 0 ? (
        isAnErrorInMail ? (
          <span className="error-message">
            {TEXT.ERROR}
          </span>
        ) : (
          <span className="success-message">
            {TEXT.SUCCESS}
          </span>
        )
      ) : null}
    </>
  )
}
