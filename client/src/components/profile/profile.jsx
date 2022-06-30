import {
  useAppForm,
  useSelector,
  useDispatch,
  useState,
  useCallback
} from 'hooks/hooks';
import { Image, Input, Button } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import {
  ImageSize,
  IconName,
  ButtonType,
  ButtonColor
} from 'common/enums/enums';
import { image as imageService } from 'services/services.js';
import styles from './styles.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));
  const [image, setImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: {
      username: user.username,
      email: user.email
    }
  });

  const handleUploadImage = file => imageService.uploadImage(file);

  const handleProfileUpdate = useCallback(
    postPayload => {
      return dispatch(postPayload);
    },
    [dispatch]
  );

  const handleUpdateProfile = useCallback(
    values => {
      if (!values.body) {
        return;
      }
      handleProfileUpdate({
        ...image,
        username: values.username
      }).then(() => {
        reset();
        setImage(undefined);
      });
    },
    [image, handleProfileUpdate, reset]
  );

  const handleUploadFile = ({ target }) => {
    setIsUploading(true);
    const [file] = target.files;

    handleUploadImage(file)
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
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      name="profile"
      className={styles.profile}
    >
      <Image
        alt="profile avatar"
        isCentered
        src={user.image?.link ?? DEFAULT_USER_AVATAR}
        size={ImageSize.MEDIUM}
        isCircular
      />
      <fieldset disabled className={styles.fieldset}>
        <Input
          iconName={IconName.USER}
          placeholder="Username"
          name="username"
          value={user.username}
          control={control}
        />
        <Input
          iconName={IconName.AT}
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          control={control}
        />
      </fieldset>
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
  );
};

export { Profile };
