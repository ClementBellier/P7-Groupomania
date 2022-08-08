export function UserName({ user }) {
  return (
    <>
      {user.name && user.firstName ? (
        <div>
          {user.firstName} {user.name}
        </div>
      ) : (
        <div>{user.email}</div>
      )}
      {user.departement && <div>{user.departement}</div>}
    </>
  )
}
