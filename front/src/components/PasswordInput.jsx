import { useState } from 'react'
import { PASSWORD_INPUT as PASSWORD } from '../../public/assets/texts/fr-FR'

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

  const handlepasswordInput = value => {
    setPassword(value)
    !PASSWORD.WHOLEPASSWORD.REGEXP.test(value)
      ? setIsAnErrorInPassword(true)
      : setIsAnErrorInPassword(false)
    !PASSWORD.MORE_THAN_EIGHT_CHAR.REGEXP.test(value)
      ? setIsMoreThanEightChar(true)
      : setIsMoreThanEightChar(false)
    !PASSWORD.HAVE_UPPERCASE.REGEXP.test(value)
      ? setIsHaveUppercase(true)
      : setIsHaveUppercase(false)
    !PASSWORD.HAVE_LOWERCASE.REGEXP.test(value)
      ? setIsHaveLowercase(true)
      : setIsHaveLowercase(false)
    !PASSWORD.HAVE_TWO_DIGITS.REGEXP.test(value)
      ? setIsHaveTwoDigits(true)
      : setIsHaveTwoDigits(false)
    !PASSWORD.HAVE_SPECIAL_CHAR.REGEXP.test(value)
      ? setIsHaveSpecialChar(true)
      : setIsHaveSpecialChar(false)
  }

  return (
    <>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => handlepasswordInput(e.target.value)}
        onFocus={() => setIsOnFocus(true)}
        pattern={PASSWORD.WHOLEPASSWORD.REGEXP}
        placeholder={PASSWORD.PLACEHOLDER}
        required
      />
      {!isLoginActive && isOnFocus && password.length !== 0 ? (
        isAnErrorInPassword ? (
          <>
            {isMoreThanEightChar ? (
              <span className="error-message">
                {PASSWORD.MORE_THAN_EIGHT_CHAR.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {PASSWORD.MORE_THAN_EIGHT_CHAR.SUCCESS}
              </span>
            )}
            {isHaveUppercase ? (
              <span className="error-message">
                {PASSWORD.HAVE_UPPERCASE.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {PASSWORD.HAVE_UPPERCASE.SUCCESS}
              </span>
            )}
            {isHaveLowercase ? (
              <span className="error-message">
                {PASSWORD.HAVE_LOWERCASE.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {PASSWORD.HAVE_LOWERCASE.SUCCESS}
              </span>
            )}
            {isHaveTwoDigits ? (
              <span className="error-message">
                {PASSWORD.HAVE_TWO_DIGITS.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {PASSWORD.HAVE_TWO_DIGITS.SUCCESS}
              </span>
            )}
            {isHaveSpecialChar ? (
              <span className="error-message">
                {PASSWORD.HAVE_SPECIAL_CHAR.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {PASSWORD.HAVE_SPECIAL_CHAR.SUCCESS}
              </span>
            )}
          </>
        ) : (
          <span className="success-message">
            {PASSWORD.WHOLEPASSWORD.SUCCESS}
          </span>
        )
      ) : null}
    </>
  )
}
