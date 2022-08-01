const postModel = require("../models/Post");
const userModel = require("../models/User");

exports.savePostInDB = async (post) => {
  return postModel
    .create({ ...post })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};

exports.findAllPosts = async (userId) => {
  const options = {
    include: {
      model: userModel,
      as: "user",
      attributes: { exclude: ["id", "role", "password"] },
    },
  };
  if(userId) options.where = {userId}
  return postModel
    .findAll(options)
    .then((posts) => posts)
    .catch((error) => {
      return { error };
    });
};

exports.findOnePost = async (postId) => {
  const options = {
    where: { id: postId },
    include: {
      model: userModel,
      as: "user",
      attributes: { exclude: ["id", "role", "password"] },
    },
  };
  return postModel
    .findOne(options)
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};

exports.deletePost = async (postId) => {
  return postModel
    .destroy({ where: { id: postId } })
    .then((deleteResult) => {
      if (deleteResult === 0) return { error: "Post inexistant" };
      return deleteResult;
    })
    .catch((error) => {
      return { error };
    });
};

exports.modifyPost = async (post) => {
  return postModel
    .update({ ...post }, { where: { id: post.id } })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};
