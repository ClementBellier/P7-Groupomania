export function Loader() {
  return (
    <div className="loader">
      <svg className="loader__logo">
        <use href="#groupomania-logo" />
      </svg>
      <p className="loader__text">En chargement...</p>
    </div>
  )
}
