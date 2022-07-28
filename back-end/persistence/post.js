const postModel = require("../models/Post");

exports.savePostInDB = async (post) => {
  const newPost = new postModel({ ...post });
  return newPost
    .save()
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};

exports.findAllPosts = async (param) => {
  return postModel
    .find(param)
    .then((posts) => posts)
    .catch((error) => {
      return { error };
    });
};

exports.findOnePost = async (postId) => {
  return postModel
    .findOne({ _id: postId })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};

exports.deletePost = async (postId) => {
  return postModel
    .deleteOne({ _id: postId })
    .then((deleteResult) => {
      if (deleteResult.ok === 0) return { error: "Post inexistant" };
      return deleteResult;
    })
    .catch((error) => {
      return { error };
    });
};

exports.modifyPost = async (post) => {
  return postModel
    .findOneAndUpdate({ _id: post._id }, { ...post }, { new: true })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};
