import { useState } from 'react'
import { PASSWORD_INPUT as TEXT } from '../../public/assets/texts/fr-FR'

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
    !TEXT.WHOLEPASSWORD.REGEXP.test(value)
      ? setIsAnErrorInPassword(true)
      : setIsAnErrorInPassword(false)
    !TEXT.MORE_THAN_EIGHT_CHAR.REGEXP.test(value)
      ? setIsMoreThanEightChar(true)
      : setIsMoreThanEightChar(false)
    !TEXT.HAVE_UPPERCASE.REGEXP.test(value)
      ? setIsHaveUppercase(true)
      : setIsHaveUppercase(false)
    !TEXT.HAVE_LOWERCASE.REGEXP.test(value)
      ? setIsHaveLowercase(true)
      : setIsHaveLowercase(false)
    !TEXT.HAVE_TWO_DIGITS.REGEXP.test(value)
      ? setIsHaveTwoDigits(true)
      : setIsHaveTwoDigits(false)
    !TEXT.HAVE_SPECIAL_CHAR.REGEXP.test(value)
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
        pattern={TEXT.WHOLEPASSWORD.REGEXP}
        placeholder={TEXT.PLACEHOLDER}
        required
      />
      {!isLoginActive && isOnFocus && password.length !== 0 ? (
        isAnErrorInPassword ? (
          <>
            {isMoreThanEightChar ? (
              <span className="error-message">
                {TEXT.MORE_THAN_EIGHT_CHAR.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {TEXT.MORE_THAN_EIGHT_CHAR.SUCCESS}
              </span>
            )}
            {isHaveUppercase ? (
              <span className="error-message">
                {TEXT.HAVE_UPPERCASE.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {TEXT.HAVE_UPPERCASE.SUCCESS}
              </span>
            )}
            {isHaveLowercase ? (
              <span className="error-message">
                {TEXT.HAVE_LOWERCASE.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {TEXT.HAVE_LOWERCASE.SUCCESS}
              </span>
            )}
            {isHaveTwoDigits ? (
              <span className="error-message">
                {TEXT.HAVE_TWO_DIGITS.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {TEXT.HAVE_TWO_DIGITS.SUCCESS}
              </span>
            )}
            {isHaveSpecialChar ? (
              <span className="error-message">
                {TEXT.HAVE_SPECIAL_CHAR.ERROR}
              </span>
            ) : (
              <span className="success-message">
                {TEXT.HAVE_SPECIAL_CHAR.SUCCESS}
              </span>
            )}
          </>
        ) : (
          <span className="success-message">
            {TEXT.WHOLEPASSWORD.SUCCESS}
          </span>
        )
      ) : null}
    </>
  )
}
