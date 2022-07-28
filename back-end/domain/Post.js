const fs = require("fs");

const ApiErrors = require("./ApiErrors");
const Success = require("./Success");

const postInDB = require("../persistence/post");

class Post {
  constructor() {}
  createPost = async (post, userId) => {
    if(post.text === '' && (post.imageUrl === null || post.imageUrl === '')) return new ApiErrors().emptyPost();
    const postToSave = {
      ...post,
      userId: userId,
      date: Date.now(),
      likes: 0,
      usersLiked: [],
    };
    const savedSauve = await postInDB.savePostInDB(postToSave);
    if (savedSauve.error) return new ApiErrors(savedSauve.error).serverError();
    return new Success().postCreated();
  };
  findAll = async () => {
    const posts = await postInDB.findAllPosts();
    if (posts.error) return new ApiErrors(posts.error).serverError();
    return new Success().postFound(posts);
  };
  findOne = async (postId) => {
    const post = await postInDB.findOnePost(postId);
    if (!post) return new ApiErrors().postNotFound();
    if (post.error) return new ApiErrors(post.error).serverError();
    return new Success().postFound(post);
  };
  deleteImage = (post) => {
    const fileName = post.imageUrl.split("/images/")[1];
    fs.unlink(`images/${fileName}`, () => {});
  };
  deletePost = async (postId, userWhoAskDelete) => {
    const post = await postInDB.findOnePost(postId);
    if (post.error) return new ApiErrors(post.error).notFound();
    if (post.userId !== userWhoAskDelete.userId && userWhoAskDelete.role !== 'admin')
      return new ApiErrors().unauthorizedRequest();

    if(post.imageUrl !== null)this.deleteImage(post);
    const deletedPost = await postInDB.deletePost(postId);
    if (deletedPost.error) return new ApiErrors(deletedPost).serverError();
    return new Success().postDeleted();
  };
  updatePost = async (post) => {
    return await postInDB.modifyPost(post);
  };
  modifyPost = async (modifiedPost, userWhoAskModify) => {
    const originPost = await postInDB.findOnePost(modifiedPost._id);
    if (originPost.error) return new ApiErrors(originPost.error).notFound();
    if (originPost.userId !== userWhoAskModify.userId && userWhoAskModify.role !== 'admin')
      return new ApiErrors().unauthorizedRequest();

    if (originPost.imageUrl !== null && modifiedPost.imageUrl !== originPost.imageUrl) this.deleteImage(originPost);
    const updatedPost = await this.updatePost(modifiedPost);
    if (updatedPost.error)
      return new ApiErrors(updatedPost.error).serverError();
    return new Success().postModified();
  };
  unlike = async (userId, post) => {
    if (post.usersLiked.includes(userId)) {
      post.usersLiked = post.usersLiked.filter((id) => id !== userId);
      post.likes--;
      const unlikePost = await this.updatePost(post);
      if (unlikePost.error) return new ApiErrors(unlikePost.error).serverError();
      return new Success().unlikeRecord();
    }
    return new ApiErrors("L'utilisateur-rice n'a pas voté").badRequest();
  };

  likePost = async (userId, like, postId) => {
    const post = await postInDB.findOnePost(postId);
    if (post.error) return new ApiErrors(post.error).notFound();
    if (like === 0) return await this.unlike(userId, post);
    if (post.usersLiked.includes(userId))
      return new ApiErrors("L'utilisateur-rice a déjà voté").badRequest();
    if (like === 1) {
      post.likes++;
      post.usersLiked.push(`${userId}`);
      const likePost = await this.updatePost(post);
      if (likePost.error) return new ApiErrors(likePost.error).serverError();
      return new Success().likeRecord();
    }
    return new ApiErrors("Ceci n'est pas un vote convenable").badRequest();
  };
}

module.exports = Post;
