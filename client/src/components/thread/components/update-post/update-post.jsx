import PropTypes from 'prop-types';
import { useCallback, useState, useAppForm } from 'hooks/hooks.js';
import { postType } from 'common/prop-types/prop-types';
import {
  ButtonColor,
  ButtonType,
  IconName,
  PostPayloadKey
} from 'common/enums/enums.js';
import { Button, Image, Input, Segment } from 'components/common/common.js';
import { DEFAULT_UPDATE_POST_PAYLOAD } from './common/constants.js';

import styles from './styles.module.scss';

const UpdatePost = ({ onPostUpdate, onUploadImage, post }) => {
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_UPDATE_POST_PAYLOAD
  });

  const handleUpdatePost = useCallback(
    values => {
      const {
        body,
        image: { id: imageId, link: imageLink }
      } = post;
      if (!values.body && !image) {
        setMessage('You did not change text in the area above!');
        return;
      }
      const imageOptions = {
        ...image,
        id: post.id
      };

      const updateOptions = { ...imageOptions, imageId, imageLink };
      const options = image ? imageOptions : updateOptions;
      onPostUpdate({
        ...options,
        body: values.body ? values.body : body
      }).then(() => {
        reset();
        setImage(undefined);
      });
    },
    [image, reset, onPostUpdate]
  );

  const handleUploadFile = ({ target }) => {
    setIsUploading(true);
    const [file] = target.files;

    onUploadImage(file)
      .then(({ id: imageId, link: imageLink }) => {
        setImage({ imageId, imageLink });
      })
      .catch(() => {
        // TODO: show error
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <Segment>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <Input
          name={PostPayloadKey.BODY}
          placeholder="What is the news?"
          rows={5}
          control={control}
          bodyValue={post.body}
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
              Change image
              <input
                name="image"
                type="file"
                onChange={handleUploadFile}
                hidden
              />
            </label>
          </Button>
          <Button color={ButtonColor.BLUE} type={ButtonType.SUBMIT}>
            Update
          </Button>
        </div>
      </form>
    </Segment>
  );
};

UpdatePost.propTypes = {
  onPostUpdate: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  post: postType.isRequired
};

export { UpdatePost };
