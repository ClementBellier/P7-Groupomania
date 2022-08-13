import useAuth from '../utils/hooks/useAuth'
import { useEffect, useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import './styles/Login.css'
import './styles/UserDetails.css'

export function UserDetails({ userId }) {
  const { userDetails } = useAuth()
  const [isModifyActive, setModifyActive] = useState(false)
  const [userData, setUserData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: `http://localhost:3000/api/users/${userId}`,
        token: userDetails.token,
      })
      setUserData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchUserData()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {error}= await doFetch({
        method: 'PUT',
        url: `http://localhost:3000/api/users/${userId}`,
        body: userData,
        token: userDetails.token,
      })
      console.error(error)
  }
  if (error)
    return (
      <h3
        className="user-details"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        Oups, il y a eu une erreur
      </h3>
    )
  return (
    <>
      {isLoading ? (
        <p>En chargement</p>
      ) : (
        <form className="user-details">
          <h2>{userDetails.userId === parseInt(userId) ? 'Mon Profil' : 'Son Profil'}</h2>
          <div>
            <label htmlFor="email">Email: </label>
            {isModifyActive ? (
              <input
                id="email"
                value={userData.email}
                type="email"
                required
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div>
            <label htmlFor="first-name">Prénom: </label>
            {isModifyActive ? (
              <input
                id="first-name"
                value={userData.firstName ?? ''}
                placeholder="Donnée non renseignée"
                type="text"
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            ) : (
              userData.firstName ? <span>{userData.firstName}</span> : <span className='user-details__no-data'>Donnée non renseignée</span>
            )}
          </div>
          <div>
            <label htmlFor="name">Nom: </label>
            {isModifyActive ? (
              <input
                id="name"
                value={userData.name ?? ''}
                placeholder="Donnée non renseignée"
                type="text"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            ) : (
                userData.name ? <span>{userData.name}</span> : <span className='user-details__no-data'>Donnée non renseignée</span>
            )}
          </div>
          <div>
            <label htmlFor="departement">Département: </label>
            {isModifyActive ? (
              <input
                id="departement"
                value={userData.departement ?? ''}
                placeholder="Donnée non renseignée"
                type="text"
                onChange={(e) =>
                  setUserData({ ...userData, departement: e.target.value })
                }
              />
            ) : (
                userData.departement ? <span>{userData.departement}</span> : <span className='user-details__no-data'>Donnée non renseignée</span>
            )}
          </div>
          <div className="user-details__buttons">
            {isModifyActive && (
              <button className="accent" onClick={(e) => handleSubmit(e)}>
                Ok
              </button>
            )}
            {userDetails.userId === parseInt(userId) ||
            userDetails.role === 'admin' ? (
              <button
                className={!isModifyActive ? 'accent' : undefined}
                onClick={(e) => {
                  setModifyActive(!isModifyActive)
                  e.preventDefault()
                }}
              >
                {isModifyActive ? 'Annuler' : 'Modifier'}
              </button>
            ) : null}
          </div>
        </form>
      )}
    </>
  )
}
