const Sequelize = require('sequelize')
const database = require('../persistence/database')
const userModel = require('./User')

const postModel = database.define(
  'posts',
  {
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
      type: Sequelize.STRING(15000),
      defaultValue: '',
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
  },
  {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

const commentModel = database.define(
  'comments',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.STRING(15000),
      defaultValue: '',
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
  },
  {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
)

const likesModel = database.define('userlikes', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: userModel,
      key: 'id',
    },
  },
  post_id: {
    type: Sequelize.INTEGER,
    references: {
      model: postModel,
      key: 'id',
    },
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
})

const commentLikeModel = database.define('commentlikes', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: userModel,
      key: 'id',
    },
  },
  commentId: {
    type: Sequelize.INTEGER,
    references: {
      model: commentModel,
      key: 'id',
    },
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
})

postModel.belongsTo(userModel)
postModel.hasMany(commentModel, { foreignKey: 'postId' })
commentModel.belongsTo(postModel, { foreignKey: 'postId' })
commentModel.belongsTo(userModel, { foreignKey: 'userId' })
postModel.hasMany(likesModel, { foreignKey: 'post_id' })
likesModel.belongsTo(postModel, { foreignKey: 'post_id' })
likesModel.belongsTo(userModel, { foreignKey: 'user_id' })
commentModel.hasMany(commentLikeModel, { foreignKey: 'commentId' })
commentLikeModel.belongsTo(commentModel, { foreignKey: 'commentId' })
commentLikeModel.belongsTo(userModel, { foreignKey: 'userId' })

module.exports = { postModel, likesModel, commentModel, commentLikeModel }
