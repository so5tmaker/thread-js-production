const getCommentsCountQuery = model => model.relatedQuery('comments').count().as('commentCount');

const getReactionsQuery = model => isLike => {
  const col = isLike ? 'likeCount' : 'dislikeCount';

  return model.relatedQuery('postReactions')
    .count()
    .where({ isLike })
    .as(col);
};

const getWhereUserIdQuery = userId => builder => {
  if (userId) {
    builder.where({ userId });
  }
};

const getNotWhereUserIdQuery = userId => builder => {
  if (userId) {
    builder.whereNot({ userId });
  }
};

export { getCommentsCountQuery, getReactionsQuery, getWhereUserIdQuery, getNotWhereUserIdQuery };
