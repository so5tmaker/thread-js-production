class Comment {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
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
}

export { Comment };
