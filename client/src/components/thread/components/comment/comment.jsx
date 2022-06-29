import { getFromNowTime } from 'helpers/helpers';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { commentType } from 'common/prop-types/prop-types';
import PropTypes from 'prop-types';
import { IconName } from 'common/enums/enums.js';
import { Icon, IconButton } from 'components/common/common.js';

import styles from './styles.module.scss';

const Comment = ({
  comment: { id, body, createdAt, user, likeCount, dislikeCount },
  userId,
  onFormClose,
  onCommentDelete,
  onCommentLike,
  onCommentDisLike,
  onHoverCommentLikes
}) => {
  const handleCommentLike = () => onCommentLike(id);
  const handleCommentDisLike = () => onCommentDisLike(id);
  const handleHoverCommentsLikes = (e, isLeaving) => {
    return onHoverCommentLikes({
      top: e.pageY,
      left: e.pageX,
      id,
      isLeaving
    });
  };

  return (
    <div className={styles.comment}>
      <div>
        <img
          className={styles.avatar}
          src={user.image?.link ?? DEFAULT_USER_AVATAR}
          alt="avatar"
        />
      </div>
      <div>
        <div>
          <span className={styles.author}>{user.username}</span>
          <span className={styles.date}>{getFromNowTime(createdAt)}</span>
          <IconButton
            className={styles.icon}
            iconName={IconName.THUMBS_UP}
            label={likeCount}
            onClick={handleCommentLike}
            onMouseEnter={e => handleHoverCommentsLikes(e, false)}
            onMouseLeave={e => handleHoverCommentsLikes(e, true)}
          />
          <IconButton
            className={styles.icon}
            iconName={IconName.THUMBS_DOWN}
            label={dislikeCount}
            onClick={handleCommentDisLike}
          />
          {userId === user.id && (
            <>
              <span onClick={() => onFormClose({ id, body })}>
                <Icon className={styles.icon} name={IconName.EDIT_POST} />
              </span>
              <span onClick={() => onCommentDelete(id)}>
                <Icon className={styles.icon} name={IconName.DELETE_POST} />
              </span>
            </>
          )}
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: commentType.isRequired,
  userId: PropTypes.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentLike: PropTypes.func.isRequired,
  onCommentDisLike: PropTypes.func.isRequired,
  onHoverCommentLikes: PropTypes.func
};

Comment.defaultProps = {
  onHoverCommentLikes: () => {}
};

export { Comment };
