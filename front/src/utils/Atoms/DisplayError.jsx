export function DisplayError({ message, setError, ref }) {
  return (
    <div
      ref={ref}
      className="display-error user-details"
      style={{gap: "20px", padding: "20px"}}
      onClick={()=>setError(false)}
    >
      <img src="\assets\undraw_server_down_s-4-lk.svg" width="100%" />
      <h3>Oups, il y a eu une erreur</h3>
      {message && <p>{message}</p>}
    </div>
  )
}
