import { useState } from 'react'
import { EMAIL_INPUT } from '../../public/assets/texts/fr-FR'

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
    !EMAIL_INPUT.REGEXP.test(value)
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
        pattern={EMAIL_INPUT.REGEXP}
        placeholder={EMAIL_INPUT.PLACEHOLDER}
        required
      />
      {!isLoginActive && isOnFocus && email.length !== 0 ? (
        isAnErrorInMail ? (
          <span className="error-message">
            {EMAIL_INPUT.ERROR}
          </span>
        ) : (
          <span className="success-message">
            {EMAIL_INPUT.SUCCESS}
          </span>
        )
      ) : null}
    </>
  )
}
