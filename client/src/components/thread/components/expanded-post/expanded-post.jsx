import PropTypes from 'prop-types';
import {
  useState,
  useCallback,
  useDispatch,
  useSelector
} from 'hooks/hooks.js';
import { threadActionCreator } from 'store/actions.js';
import { Spinner, Post, Modal } from 'components/common/common.js';
import {
  Comment,
  AddComment,
  UpdateComment,
  UsersList
} from 'components/thread/components/components.js';
import { getSortedComments } from './helpers/helpers.js';

const ExpandedPost = ({ onSharePost, userId }) => {
  const dispatch = useDispatch();
  const { post, users } = useSelector(state => ({
    post: state.posts.expandedPost,
    users: state.posts.users
  }));
  const [updatedComment, setUpdatedComment] = useState(undefined);
  const [divOrientation, setdivOrientation] = useState({ top: 0, left: 0 });

  const handlePostLike = useCallback(
    id => dispatch(threadActionCreator.likePost({ id, isLike: true })),
    [dispatch]
  );

  const handlePostDisLike = useCallback(
    id => dispatch(threadActionCreator.likePost({ id, isLike: false })),
    [dispatch]
  );

  const handleCommentAdd = useCallback(
    commentPayload => dispatch(threadActionCreator.addComment(commentPayload)),
    [dispatch]
  );

  const handleCommentUpdate = useCallback(
    commentPayload => {
      setUpdatedComment(undefined);
      return dispatch(threadActionCreator.updateComment(commentPayload));
    },
    [dispatch]
  );

  const handleCommentDelete = useCallback(
    id => dispatch(threadActionCreator.deleteComment(id)),
    [dispatch]
  );

  const handleCommentLike = useCallback(
    id => dispatch(threadActionCreator.likeComment({ id, isLike: true })),
    [dispatch]
  );

  const handleCommentDisLike = useCallback(
    id => dispatch(threadActionCreator.likeComment({ id, isLike: false })),
    [dispatch]
  );

  const handleExpandedPostToggle = useCallback(
    id => dispatch(threadActionCreator.toggleExpandedPost(id)),
    [dispatch]
  );

  const handleExpandedPostClose = () => handleExpandedPostToggle();

  const handleUpdateFormClose = comment => {
    setUpdatedComment(!updatedComment ? comment : undefined);
  };

  const handleCommentLikesHover = useCallback(
    postPayload => {
      const { top, left, id, isLeaving } = postPayload;
      setdivOrientation({ top, left });
      return dispatch(
        threadActionCreator.loadCommentUsers({
          id,
          isLeaving,
          isComments: true
        })
      );
    },
    [dispatch]
  );

  const sortedComments = getSortedComments(post.comments ?? []);

  return (
    <Modal isOpen onClose={handleExpandedPostClose}>
      {post ? (
        <>
          <Post
            post={post}
            onPostLike={handlePostLike}
            onPostDisLike={handlePostDisLike}
            onExpandedPostToggle={handleExpandedPostToggle}
            onSharePost={onSharePost}
          />
          <div>
            <h3>Comments</h3>
            {sortedComments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                userId={userId}
                onFormClose={handleUpdateFormClose}
                onCommentDelete={handleCommentDelete}
                onCommentLike={handleCommentLike}
                onCommentDisLike={handleCommentDisLike}
                onHoverCommentLikes={handleCommentLikesHover}
              />
            ))}
            {!updatedComment && (
              <AddComment postId={post.id} onCommentAdd={handleCommentAdd} />
            )}
            {updatedComment && (
              <UpdateComment
                postId={post.id}
                comment={updatedComment}
                onCommentUpdate={handleCommentUpdate}
              />
            )}
          </div>
          <UsersList
            top={divOrientation.top}
            left={divOrientation.left}
            users={users}
          />
        </>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
};

ExpandedPost.propTypes = {
  onSharePost: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

export { ExpandedPost };
