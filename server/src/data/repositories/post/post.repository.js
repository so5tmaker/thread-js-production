import { Abstract } from '../abstract/abstract.repository.js';
import {
  getCommentsCountQuery,
  getReactionsQuery,
  getWhereUserIdQuery,
  getNotWhereUserIdQuery,
  getwhereExistsUserIdQuery
} from './helpers.js';

import { THREAD_TOOLBAR_KEY } from '../../../common/constants/constants.js';

class Post extends Abstract {
  constructor({ postModel }) {
    super(postModel);
  }

  getPosts(filter) {
    const { from: offset, count: limit, userId, showHide } = filter;

    const userIdQuery = id => {
      switch (showHide) {
        case THREAD_TOOLBAR_KEY.HIDE_OWN_POSTS:
          return getNotWhereUserIdQuery(id);
        case THREAD_TOOLBAR_KEY.SHOW_POSTS_LIKED_BY_ME:
          return getwhereExistsUserIdQuery(this.model)(id);
        default: return getWhereUserIdQuery(id);
      }
    };

    return this.model
      .query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where(userIdQuery(userId))
      .withGraphFetched('[image, user.image]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);
  }

  getPostById(id) {
    return this.model
      .query()
      .select(
        'posts.*',
        getCommentsCountQuery(this.model),
        getReactionsQuery(this.model)(true),
        getReactionsQuery(this.model)(false)
      )
      .where({ id })
      .withGraphFetched('[comments.user.image, user.image, image]')
      .first();
  }
}

export { Post };
