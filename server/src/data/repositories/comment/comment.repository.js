import { Abstract } from '../abstract/abstract.repository.js';
import { getReactionsQuery } from './helpers.js';

class Comment extends Abstract {
  constructor({ commentModel }) {
    super(commentModel);
  }

  getComments(filter) {
    const { postId } = filter;

    return this.model
      .query()
      .select(
        'comments.*',
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where({ postId })
      .withGraphFetched('[user.image]')
      .orderBy('createdAt', 'desc');
  }

  getCommentById(id) {
    return this.model.query().select(
      'comments.*',
      getReactionsQuery(this.model)(true),
      getReactionsQuery(this.model)(false)
    ).where({ id }).withGraphFetched('[user.image]');
  }
}

export { Comment };
