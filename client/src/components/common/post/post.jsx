import PropTypes from 'prop-types';

import { getFromNowTime } from 'helpers/helpers';
import { IconName } from 'common/enums/enums';
import { postType } from 'common/prop-types/prop-types';
import { IconButton, Image } from 'components/common/common';

import styles from './styles.module.scss';

const Post = ({
  post,
  onPostLike,
  onPostDisLike,
  onExpandedPostToggle,
  onSharePost,
  onEditPost,
  userId,
  onDeletePost,
  onHoverPostLikes
}) => {
  const {
    id,
    image,
    body,
    user,
    likeCount,
    dislikeCount,
    commentCount,
    createdAt
  } = post;
  const date = getFromNowTime(createdAt);

  const handlePostLike = () => onPostLike(id);
  const handlePostDisLike = () => onPostDisLike(id);
  const handleExpandedPostToggle = () => onExpandedPostToggle(id);
  const handleSharePost = () => onSharePost(id);
  const handleEditPost = () => onEditPost(id);
  const handleDeletePost = () => onDeletePost(id);
  const handleHoverPostLikes = (e, isLeaving) => {
    return onHoverPostLikes({
      top: e.pageY,
      left: e.pageX,
      id,
      isLeaving
    });
  };

  return (
    <div className={styles.card}>
      {image && <Image src={image.link} alt="post image" />}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{`posted by ${user.username} - ${date}`}</span>
        </div>
        <p className={styles.description}>{body}</p>
      </div>
      <div className={styles.extra}>
        <IconButton
          iconName={IconName.THUMBS_UP}
          label={likeCount}
          onClick={handlePostLike}
          onMouseEnter={e => handleHoverPostLikes(e, false)}
          onMouseLeave={e => handleHoverPostLikes(e, true)}
        />
        <IconButton
          iconName={IconName.THUMBS_DOWN}
          label={dislikeCount}
          onClick={handlePostDisLike}
        />
        <IconButton
          iconName={IconName.COMMENT}
          label={commentCount}
          onClick={handleExpandedPostToggle}
        />
        <IconButton
          iconName={IconName.SHARE_ALTERNATE}
          onClick={handleSharePost}
        />
        {user.id === userId && (
          <>
            <IconButton
              iconName={IconName.EDIT_POST}
              onClick={handleEditPost}
            />
            <IconButton
              iconName={IconName.DELETE_POST}
              onClick={handleDeletePost}
            />
          </>
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: postType.isRequired,
  onPostLike: PropTypes.func.isRequired,
  onPostDisLike: PropTypes.func.isRequired,
  onExpandedPostToggle: PropTypes.func.isRequired,
  onSharePost: PropTypes.func.isRequired,
  onEditPost: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onHoverPostLikes: PropTypes.func
};

Post.defaultProps = {
  onHoverPostLikes: () => {}
};

export { Post };
