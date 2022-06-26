const getReactionsQuery = model => isLike => {
  const col = isLike ? 'likeCount' : 'dislikeCount';

  return model.relatedQuery('commentReactions')
    .count()
    .where({ isLike })
    .as(col);
};

export { getReactionsQuery };
