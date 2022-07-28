class Success {
  constructor() {}
  returnSuccess = (successCodeHTTP, message) => {
    return { code: successCodeHTTP, message };
  };
  userCreated = () =>
    this.returnSuccess(201, { message: "Utilisateur-rice créé-e" });
  userFound = (userId, role, token) =>
    this.returnSuccess(200, { userId: userId, role: role, token: token });
  postCreated = () => this.returnSuccess(201, { message: "Post créé" });
  postModified = () => this.returnSuccess(200, { message: "Post modifié" });
  postDeleted = () => this.returnSuccess(200, { message: "Post supprimé" });
  likeRecord = () =>
    this.returnSuccess(200, { message: "Vote ajouté au post" });
  unlikeRecord = () =>
    this.returnSuccess(200, { message: "Vote supprimé du post" });
  postFound = (post) => this.returnSuccess(200, post);
}

module.exports = Success;
