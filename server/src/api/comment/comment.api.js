import { CommentsApiPath, ControllerHook, HttpMethod } from '../../common/enums/enums.js';

const initComment = (fastify, opts, done) => {
  const { comment: commentService } = opts.services;

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

  done();
};

export { initComment };
