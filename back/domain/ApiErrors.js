class ApiErrors extends Error {
  constructor(error) {
    super()
    this.error = error
  }
  returnError = (errorCodeHTTP) => {
    return { code: errorCodeHTTP, message: { error: this.error } }
  }
  serverError = () => this.returnError(500)
  badRequest = () => this.returnError(400)
  unauthorized = () => this.returnError(401)
  notFound = () => this.returnError(404)
  userNotFound = () => {
    this.error = 'Utilisateur-rice non trouvé-e !'
    return this.notFound()
  }
  postNotFound = () => {
    this.error = 'Post non trouvé !'
    return this.notFound()
  }
  wrongPassword = () => {
    this.error = 'Mot de pass incorrect !'
    return this.unauthorized()
  }
  unauthorizedRequest = () => {
    this.error = 'Requête non autorisée'
    return this.returnError(403)
  }
  emptyPost = () => {
    this.error = 'Le post doit contenir du texte et/ou une image.'
    return this.badRequest()
  }
}

module.exports = ApiErrors
