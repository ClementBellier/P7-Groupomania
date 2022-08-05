const Sequelize = require("sequelize");
const database = require("../persistence/database");
const userModel = require("./User");

const postModel = database.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  text: {
    type: Sequelize.STRING(20000),
    defaultValue: "",
  },
  imageUrl: {
    type: Sequelize.STRING(500),
    defaultValue: null,
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  modified: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  },
  commentsNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

const likesModel = database.define("userlikes", {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
  post_id: {
    type: Sequelize.INTEGER,
    references: {
      model: postModel,
      key: "id",
    },
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
postModel.belongsTo(userModel);
postModel.hasMany(likesModel, {foreignKey: "post_id"});
likesModel.belongsTo(postModel, {foreignKey: "post_id"});
likesModel.belongsTo(userModel, {foreignKey: "user_id"});
module.exports = { postModel, likesModel };
