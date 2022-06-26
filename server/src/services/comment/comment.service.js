class Comment {
  constructor({ commentRepository, commentReactionRepository }) {
    this._commentRepository = commentRepository;
    this._commentReactionRepository = commentReactionRepository;
  }

  getComments(filter) {
    return this._commentRepository.getComments(filter);
  }

  create(userId, comment) {
    return this._commentRepository.create({
      ...comment,
      userId
    });
  }

  getCommentById(id) {
    return this._commentRepository.getCommentById(id);
  }

  async updateCommentById(id, { body }) {
    return this._commentRepository.updateById(id, { body });
  }

  async deleteCommentById(id) {
    return this._commentRepository.deleteById(id);
  }

  async setReaction(userId, { commentId, isLike = true }) {
    // define the callback for future use as a promise
    const updateOrDelete = react => (react.isLike === isLike
      ? this._commentReactionRepository.deleteById(react.id)
      : this._commentReactionRepository.updateById(react.id, { isLike }));

    const reaction = await this._commentReactionRepository.getCommentReaction(
      userId,
      commentId
    );

    const updation = value => (value ? [-1, 0] : [1, -1]);
    const getCounts = () => {
      const counts = reaction ? updation(reaction.isLike === isLike) : [1, 0];
      return isLike ? counts : counts.reverse();
    };

    const result = reaction
      ? await updateOrDelete(reaction)
      : await this._commentReactionRepository.create({ userId, commentId, isLike });

    const [likeCount, dislikeCount] = getCounts();

    // the result is an integer when an entity is deleted
    return Number.isInteger(result)
      ? { likeCount, dislikeCount }
      : { ...await this._commentReactionRepository.getCommentReaction(userId, commentId), likeCount, dislikeCount };
  }
}

export { Comment };
