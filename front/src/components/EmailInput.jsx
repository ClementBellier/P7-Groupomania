import { useState } from 'react'

export function EmailInput({ email, setEmail, isLoginActive, isAnErrorInMail, setIsAnErrorInMail, setErrorMessage }) {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const mailRegExp = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/
  const handleEmailInput = (value) => {
    setErrorMessage()
    setEmail(value)
    !mailRegExp.test(value)
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
        pattern={mailRegExp}
        required
      />
      {!isLoginActive && isOnFocus && email.length !==0 ? (
        isAnErrorInMail ? (
          <span className="error-message">
            L'email doit être dans le format suivant prenom.nom@groupomania.fr
          </span>
        ) : (
          <span className="success-message">
            L'email est dans le bon format
          </span>
        )
      ) : null}
    </>
  )
}
