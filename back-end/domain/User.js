const crypt = require("../encryption/crypt");
const tokenBuilder = require("../encryption/token");

const ApiErrors = require("../domain/ApiErrors");
const Success = require("../domain/Success");

const databaseUserAccess = require("../persistence/user");
const databasePostsAccess = require("../persistence/post");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.role = "";
    this.userId = "";
  }
  saveUser = async () => {
    const encryptPassword = await crypt.cryptPassword(this.password);
    if (encryptPassword.error)
      return new ApiErrors(encryptPassword.error).serverError();
    this.password = encryptPassword.hash;
    const savedUser = await databaseUserAccess.saveUserInDB(
      this.email,
      this.password
    );
    if (savedUser.error) return new ApiErrors(savedUser.error).badRequest();
    return new Success().userCreated();
  };
  findUser = async () => {
    const userInDB = await databaseUserAccess.findUserByMailInDB(this.email);

    if (!userInDB) return new ApiErrors().userNotFound();
    if (userInDB.error) return new ApiErrors(userInDB.error).serverError();

    this.userId = userInDB.id;
    this.role = userInDB.role;
    const validPassword = await crypt.comparePassword(
      this.password,
      userInDB.password
    );

    if (!validPassword) return new ApiErrors().wrongPassword();

    const token = tokenBuilder.signToken(this.userId, this.role);
    return new Success().userFound(this.userId, this.role, token);
  };
  findDataOfThisUser = async (userId) => {
    const userInDB = await databaseUserAccess.findUserByIdInDB(userId);
    if (!userInDB) return new ApiErrors().userNotFound();
    if (userInDB.error) return new ApiErrors(userInDB.error).serverError();
    return new Success().postFound({userInDB});
  };
  findPostsOfThisUser = async (userId) => {
    const postsOfUser = await databasePostsAccess.findAllPosts({ userId });
    if (postsOfUser.error)
      return new ApiErrors(postsOfUser.error).serverError();
    return new Success().postFound(postsOfUser);
  };
  
  authorize = (token) => {
    const decodedToken = tokenBuilder.verifyToken(token);
    if (!decodedToken || decodedToken.error)
      return new ApiErrors("Requête non authentifiée !").unauthorized();
    return { code: 200, userId: decodedToken.userId, role: decodedToken.role };
  };
}

module.exports = User;
