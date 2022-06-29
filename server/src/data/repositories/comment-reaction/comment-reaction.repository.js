import { Abstract } from '../abstract/abstract.repository.js';

class CommentReaction extends Abstract {
  constructor({ commentReactionModel }) {
    super(commentReactionModel);
  }

  getCommentReaction(userId, commentId) {
    return this.model
      .query()
      .select()
      .where({ userId })
      .andWhere({ commentId })
      .withGraphFetched('[comment]')
      .first();
  }

  getUsersLikedComment(commentId) {
    return this.model
      .query()
      .select('commentReactions.userId')
      .where({ commentId })
      .andWhere({ isLike: true })
      .withGraphFetched('[user]');
  }
}

export { CommentReaction };
