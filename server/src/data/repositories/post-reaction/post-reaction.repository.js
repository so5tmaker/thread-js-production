import { Abstract } from '../abstract/abstract.repository.js';
// import { getUsersQuery } from './helpers.js';

class PostReaction extends Abstract {
  constructor({ postReactionModel }) {
    super(postReactionModel);
  }

  getPostReaction(userId, postId) {
    return this.model
      .query()
      .select()
      .where({ userId })
      .andWhere({ postId })
      .withGraphFetched('[post]')
      .first();
  }

  getUsersLikedPost(postId) {
    return this.model
      .query()
      .select('postReactions.userId')
      .where({ postId })
      .andWhere({ isLike: true })
      .withGraphFetched('[user]');
  }
}

export { PostReaction };
