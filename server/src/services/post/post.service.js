class Post {
  constructor({ postRepository, postReactionRepository }) {
    this._postRepository = postRepository;
    this._postReactionRepository = postReactionRepository;
  }

  getPosts(filter) {
    return this._postRepository.getPosts(filter);
  }

  getPostById(id) {
    return this._postRepository.getPostById(id);
  }

  create(userId, post) {
    return this._postRepository.create({
      ...post,
      userId
    });
  }

  async updatePostById(id, { imageId, body }) {
    return this._postRepository.updateById(id, { imageId, body });
  }

  async setReaction(userId, { postId, isLike = true }) {
    // define the callback for future use as a promise
    const updateOrDelete = react => (react.isLike === isLike
      ? this._postReactionRepository.deleteById(react.id)
      : this._postReactionRepository.updateById(react.id, { isLike }));

    const reaction = await this._postReactionRepository.getPostReaction(
      userId,
      postId
    );

    const updation = value => (value ? [-1, 0] : [1, -1]);
    const getCounts = () => {
      const counts = reaction ? updation(reaction.isLike === isLike) : [1, 0];
      return isLike ? counts : counts.reverse();
    };

    const result = reaction
      ? await updateOrDelete(reaction)
      : await this._postReactionRepository.create({ userId, postId, isLike });

    const [likeCount, dislikeCount] = getCounts();

    // the result is an integer when an entity is deleted
    return Number.isInteger(result)
      ? { likeCount, dislikeCount }
      : { ...await this._postReactionRepository.getPostReaction(userId, postId), likeCount, dislikeCount };
  }
}

export { Post };
