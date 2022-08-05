const Post = require("../domain/Post");

exports.getAllPosts = async (req, res, next) => {
  const response = await new Post().findAll();
  return res.status(response.code).json(response.message);
};
exports.createPost = async (req, res, next) => {
  const postObject = req.file
  ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  }
  : { ...req.body, imageUrl: null };
  const response = await new Post().createPost(postObject, req.auth.userId);
  return res.status(response.code).json(response.message);
};
exports.getOnePost = async (req, res, next) => {
  const response = await new Post().findOne(req.params.id);
  return res.status(response.code).json(response.message);
};
exports.modifyPost = async (req, res, next) => {
  const userWhoAskModify = {userId: req.auth.userId, role: req.auth.role};
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        id: req.params.id,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body, id: req.params.id };
  const response = await new Post().modifyPost(postObject, userWhoAskModify);
  return res.status(response.code).json(response.message);
};
exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  const userWhoAskDelete = {userId: req.auth.userId, role: req.auth.role};
  const response = await new Post().deletePost(postId, userWhoAskDelete);
  return res.status(response.code).json(response.message);
};
exports.likePost = async (req, res, next) => {
  const response = await new Post().likePost(
    req.auth.userId,
    req.body.like,
    req.params.id
  );
  return res.status(response.code).json(response.message);
};