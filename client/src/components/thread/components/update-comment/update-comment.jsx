import PropTypes from 'prop-types';
import { useAppForm, useCallback, useState } from 'hooks/hooks.js';
import { ButtonType, CommentPayloadKey } from 'common/enums/enums.js';
import { Button, Input } from 'components/common/common.js';
import { commentType } from 'common/prop-types/prop-types';
import { DEFAULT_UPDATE_COMMENT_PAYLOAD } from './common/constants.js';

import styles from './styles.module.scss';

const UpdateComment = ({ postId, onCommentUpdate, comment: { id, body } }) => {
  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_UPDATE_COMMENT_PAYLOAD
  });
  const [message, setMessage] = useState('');

  const handleUpdateComment = useCallback(
    values => {
      if (!values.body) {
        setMessage('You did not change text in the area above!');
        return;
      }
      onCommentUpdate({
        postId,
        id,
        body: values.body ? values.body : body
      }).then(() => reset());
    },
    [postId, reset, onCommentUpdate]
  );

  return (
    <form name="comment" onSubmit={handleSubmit(handleUpdateComment)}>
      <Input
        name={CommentPayloadKey.BODY}
        placeholder="Type a comment..."
        rows={10}
        control={control}
        bodyValue={body}
        onChangeMessage={setMessage}
      />
      <div className={styles.divMessage}>{message}</div>
      <Button type={ButtonType.SUBMIT} isPrimary>
        Update comment
      </Button>
    </form>
  );
};

UpdateComment.propTypes = {
  onCommentUpdate: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  comment: commentType.isRequired
};

export { UpdateComment };
