import { useState } from 'react'

export function PasswordInput({
  password,
  setPassword,
  isLoginActive,
  isAnErrorInPassword,
  setIsAnErrorInPassword,
}) {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [isMoreThanEightChar, setIsMoreThanEightChar] = useState(false)
  const [isHaveUppercase, setIsHaveUppercase] = useState(false)
  const [isHaveLowercase, setIsHaveLowercase] = useState(false)
  const [isHaveTwoDigits, setIsHaveTwoDigits] = useState(false)
  const [isHaveSpecialChar, setIsHaveSpecialChar] = useState(false)
  const passwordRegExp =
    /^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){2,})(?=(?:.*[!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]){1,})([A-Za-z0-9éèçàù!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]{8,})$/
  const moreThanEightChar =
    /^([A-Za-z0-9éèçàù!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]{8,})$/
  const haveUppercase = /^.*(?=(?:.*[A-Z]){1,}).*$/
  const haveLowercase = /^.*(?=(?:.*[a-z]){1,}).*$/
  const haveTwoDigits = /^.*(?=(?:.*\d){2,}).*$/
  const haveSpecialChar =
    /^.*(?=(?:.*[!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]){1,}).*$/
  const handlepasswordInput = (value) => {
    setPassword(value)
    !passwordRegExp.test(value)
      ? setIsAnErrorInPassword(true)
      : setIsAnErrorInPassword(false)
    !moreThanEightChar.test(value)
      ? setIsMoreThanEightChar(true)
      : setIsMoreThanEightChar(false)
    !haveUppercase.test(value)
      ? setIsHaveUppercase(true)
      : setIsHaveUppercase(false)
    !haveLowercase.test(value)
      ? setIsHaveLowercase(true)
      : setIsHaveLowercase(false)
    !haveTwoDigits.test(value)
      ? setIsHaveTwoDigits(true)
      : setIsHaveTwoDigits(false)
    !haveSpecialChar.test(value)
      ? setIsHaveSpecialChar(true)
      : setIsHaveSpecialChar(false)
  }

  return (
    <>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => handlepasswordInput(e.target.value)}
        onFocus={() => setIsOnFocus(true)}
        pattern={passwordRegExp}
        required
      />
      {!isLoginActive && isOnFocus && password.length !== 0 ? (
        isAnErrorInPassword ? (
          <>
            {isMoreThanEightChar ? (
              <span className="error-message">
                Le mot de passe doit contenir au moins 8 caractères et NE PEUT
                PAS avoir d'espace
              </span>
            ) : (
              <span className="success-message">
                Le mot de passe contient au moins 8 caractères et n'a pas
                d'espace
              </span>
            )}
            {isHaveUppercase ? (
              <span className="error-message">
                Le mot de passe doit contenir au moins une majuscule
              </span>
            ) : (
              <span className="success-message">
                Le mot de passe contient au moins une majuscule
              </span>
            )}
            {isHaveLowercase ? (
              <span className="error-message">
                Le mot de passe doit contenir au moins une minuscule
              </span>
            ) : (
              <span className="success-message">
                Le mot de passe contient au moins une minuscule
              </span>
            )}
            {isHaveTwoDigits ? (
              <span className="error-message">
                Le mot de passe doit contenir au moins 2 chiffres
              </span>
            ) : (
              <span className="success-message">
                Le mot de passe contient au moins 2 chiffres
              </span>
            )}
            {isHaveSpecialChar ? (
              <span className="error-message">
                Le mot de passe doit contenir au moins un caractère spécial
              </span>
            ) : (
              <span className="success-message">
                Le mot de passe contient au moins un caractère spécial
              </span>
            )}
          </>
        ) : (
          <span className="success-message">
            Le mot de passe est suffisament fort, Bravo !
          </span>
        )
      ) : null}
    </>
  )
}
