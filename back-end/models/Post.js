const Sequelize = require('sequelize')
const database = require('../persistence/database')

const postSchema = database.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  text: {
    type: Sequelize.STRING(20000),
    defaultValue: ''
  },
  imageUrl: {
    type: Sequelize.STRING(500),
    defaultValue: null
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  usersLiked: {
    type: Sequelize.STRING(500),
    defaultValue: ''
  },
  modified: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  }, 
  commentsNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = postSchema