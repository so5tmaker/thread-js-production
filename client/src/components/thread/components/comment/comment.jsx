import { getFromNowTime } from 'helpers/helpers';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { commentType } from 'common/prop-types/prop-types';
import PropTypes from 'prop-types';
import { IconName } from 'common/enums/enums.js';
import { Icon } from 'components/common/common.js';

import styles from './styles.module.scss';

const Comment = ({
  comment: { id, body, createdAt, user },
  userId,
  onFormClose
}) => (
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
        <span className={styles.icon} onClick={() => onFormClose({ id, body })}>
          {userId === user.id && <Icon name={IconName.EDIT_POST} />}
        </span>
      </div>
      <p>{body}</p>
    </div>
  </div>
);

Comment.propTypes = {
  comment: commentType.isRequired,
  userId: PropTypes.isRequired,
  onFormClose: PropTypes.func.isRequired
};

export { Comment };
