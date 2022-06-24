import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common.js';

const loadPosts = createAsyncThunk(
  ActionType.SET_ALL_POSTS,
  async (filters, { extra: { services } }) => {
    const posts = await services.post.getAllPosts(filters);
    return { posts };
  }
);

const loadMorePosts = createAsyncThunk(
  ActionType.LOAD_MORE_POSTS,
  async (filters, { getState, extra: { services } }) => {
    const {
      posts: { posts }
    } = getState();
    const loadedPosts = await services.post.getAllPosts(filters);
    const filteredPosts = loadedPosts.filter(
      post => !(posts && posts.some(loadedPost => post.id === loadedPost.id))
    );

    return { posts: filteredPosts };
  }
);

const applyPost = createAsyncThunk(
  ActionType.ADD_POST,
  async (postId, { extra: { services } }) => {
    const post = await services.post.getPost(postId);
    return { post };
  }
);

const createPost = createAsyncThunk(
  ActionType.ADD_POST,
  async (post, { extra: { services } }) => {
    const { id } = await services.post.addPost(post);
    const newPost = await services.post.getPost(id);

    return { post: newPost };
  }
);

const updatePost = createAsyncThunk(
  ActionType.UPDATE_POST,
  async ({ id, imageId, imageLink, body }, { getState, extra: { services } }) => {
    const {
      posts: { posts }
    } = getState();

    const updatedPost = await services.post.updatePost({ id, imageId, body });

    const mapPosts = item => ({
      ...item,
      image: { ...item.image, id: imageId, link: imageLink },
      imageId,
      body
    });

    const updated = posts.map(item => (
      item.id === updatedPost.id ? mapPosts(item) : item
    ));

    return { posts: updated };
  }
);

const deletePost = createAsyncThunk(
  ActionType.DELETE_POST,
  async (id, { getState, extra: { services } }) => {
    const {
      posts: { posts }
    } = getState();

    await services.post.deletePost(id);

    const rest = posts.filter(item => item.id !== id);

    return { posts: rest };
  }
);

const toggleExpandedPost = createAsyncThunk(
  ActionType.SET_EXPANDED_POST,
  async (postId, { extra: { services } }) => {
    const post = postId ? await services.post.getPost(postId) : undefined;
    return { post };
  }
);

const likePost = createAsyncThunk(
  ActionType.REACT,
  async ({ id: postId, isLike }, { getState, extra: { services } }) => {
    const { likeCount, dislikeCount } = await services.post.likePost(postId, isLike);

    const mapLikes = post => ({
      ...post,
      likeCount: Number(post.likeCount) + likeCount,
      dislikeCount: Number(post.dislikeCount) + dislikeCount
    });

    const {
      posts: { posts, expandedPost }
    } = getState();
    const updated = posts.map(post => (
      post.id !== postId ? post : mapLikes(post)
    ));
    const updatedExpandedPost = expandedPost?.id === postId
      ? mapLikes(expandedPost)
      : undefined;

    return { posts: updated, expandedPost: updatedExpandedPost };
  }
);

const addComment = createAsyncThunk(
  ActionType.COMMENT,
  async (request, { getState, extra: { services } }) => {
    const { id } = await services.comment.addComment(request);
    const comment = await services.comment.getComment(id);

    const mapComments = post => ({
      ...post,
      commentCount: Number(post.commentCount) + 1,
      comments: [...(post.comments || []), comment] // comment is taken from the current closure
    });

    const {
      posts: { posts, expandedPost }
    } = getState();
    const updated = posts.map(post => (
      post.id !== comment.postId ? post : mapComments(post)
    ));

    const updatedExpandedPost = expandedPost?.id === comment.postId
      ? mapComments(expandedPost)
      : undefined;

    return { posts: updated, expandedPost: updatedExpandedPost };
  }
);

const updateComment = createAsyncThunk(
  ActionType.UPDATE_COMMENT,
  async ({ id, body, postId }, { getState, extra: { services } }) => {
    const updatedComment = await services.comment.updateComment({ id, body });

    const mapComments = comment => ({
      ...comment,
      body // comment is taken from the current closure
    });
    const updatedComments = comments => comments.map(comment => (
      comment.id !== updatedComment.id ? comment : mapComments(comment)
    ));

    const {
      posts: { posts }
    } = getState();

    const updated = posts.map(post => (
      post.id !== postId ? post : updatedComments(post.comments)
    ));

    return { posts: updated };
  }
);

export {
  loadPosts,
  updatePost,
  deletePost,
  loadMorePosts,
  applyPost,
  createPost,
  toggleExpandedPost,
  likePost,
  addComment,
  updateComment
};
