export function UserName({ user, isShowingDepartement }) {
  return (
    <>
      {user.name && user.firstName ? (
        <div>
          {user.firstName} {user.name}
        </div>
      ) : (
        <div>{user.email}</div>
      )}
      {user.departement && isShowingDepartement && <div>{user.departement}</div>}
    </>
  )
}
