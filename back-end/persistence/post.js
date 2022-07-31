const postModel = require("../models/Post");

exports.savePostInDB = async (post) => {
  return postModel.create({ ...post })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};

exports.findAllPosts = async () => {
  return postModel
    .findAll()
    .then((posts) => posts)
    .catch((error) => {
      return { error };
    });
};

exports.findOnePost = async (postId) => {
  return postModel
    .findOne({where:{id:postId}})
    .then(post => post)
    .catch((error) => {
      return { error };
    });
};

exports.deletePost = async (postId) => {
  return postModel
    .destroy({where: { id: postId }})
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
    .update({ ...post},{ where: {id: post.id} })
    .then((post) => post)
    .catch((error) => {
      return { error };
    });
};
