import PropTypes from 'prop-types';
import { useCallback, useState, useAppForm } from 'hooks/hooks.js';
import {
  ButtonColor,
  ButtonType,
  IconName,
  PostPayloadKey
} from 'common/enums/enums.js';
import { Button, Image, Input, Segment } from 'components/common/common.js';
import { DEFAULT_ADD_POST_PAYLOAD } from './common/constants.js';

import styles from './styles.module.scss';

const AddPost = ({ onPostAdd, onUploadImage }) => {
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_ADD_POST_PAYLOAD
  });

  const handleAddPost = useCallback(
    values => {
      if (!values.body) {
        setMessage('Enter any text in the area above!');
        return;
      }
      onPostAdd({ imageId: image?.imageId, body: values.body }).then(() => {
        reset();
        setImage(undefined);
      });
    },
    [image, reset, onPostAdd]
  );

  const handleUploadFile = ({ target }) => {
    setIsUploading(true);
    const [file] = target.files;

    onUploadImage(file)
      .then(({ id: imageId, link: imageLink }) => {
        setImage({ imageId, imageLink });
      })
      .catch(() => {
        throw new Error('Can not upload file!');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <Segment>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <Input
          name={PostPayloadKey.BODY}
          placeholder="What is the news?"
          rows={5}
          control={control}
          onChangeMessage={setMessage}
        />
        <div className={styles.divMessage}>{message}</div>
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={image?.imageLink}
              alt="post image"
            />
          </div>
        )}
        <div className={styles.btnWrapper}>
          <Button
            color="teal"
            isLoading={isUploading}
            isDisabled={isUploading}
            iconName={IconName.IMAGE}
          >
            <label className={styles.btnImgLabel}>
              Attach image
              <input
                name="image"
                type="file"
                onChange={handleUploadFile}
                hidden
              />
            </label>
          </Button>
          <Button color={ButtonColor.BLUE} type={ButtonType.SUBMIT}>
            Post
          </Button>
        </div>
      </form>
    </Segment>
  );
};

AddPost.propTypes = {
  onPostAdd: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
};

export { AddPost };
