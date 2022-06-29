import { CommentsApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initComment = (fastify, opts, done) => {
  const { comment: commentService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CommentsApiPath.ROOT,
    [ControllerHook.HANDLER]: req => commentService.getComments(req.query)
  });
  fastify.route({
    method: HttpMethod.GET,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => commentService.getCommentById(req.params.id)
  });
  fastify.route({
    method: HttpMethod.POST,
    url: CommentsApiPath.ROOT,
    [ControllerHook.HANDLER]: async req => commentService.create(req.user.id, req.body)
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: req => commentService.updateCommentById(req.params.id, req.body)
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: CommentsApiPath.$ID,
    [ControllerHook.HANDLER]: req => commentService.deleteCommentById(req.params.id)
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: CommentsApiPath.REACT,
    [ControllerHook.HANDLER]: async req => {
      const reaction = await commentService.setReaction(req.user.id, req.body);

      if (reaction.comment && reaction.comment.userId !== req.user.id) {
        // notify a user if someone (not himself) liked his post
        const { isLike } = req.body;
        const like = isLike ? 'like' : 'dislike';
        req.io.to(reaction.comment.userId).emit(like, `Your comment was ${like}d!`);
      }
      return reaction;
    }
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${CommentsApiPath.REACT}${CommentsApiPath.$ID}`,
    [ControllerHook.HANDLER]: req => commentService.getUsersLikedComment(req.params.id)
  });

  done();
};

export { initComment };
