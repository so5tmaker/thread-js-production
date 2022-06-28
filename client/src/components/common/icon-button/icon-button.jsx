import PropTypes from 'prop-types';

import { IconName } from 'common/enums/enums.js';
import { Icon } from 'components/common/common.js';

import styles from './styles.module.scss';

const IconButton = ({
  iconName,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => (
  <button
    className={styles.iconButton}
    type="button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Icon name={iconName} />
    {label}
  </button>
);

IconButton.propTypes = {
  iconName: PropTypes.oneOf(Object.values(IconName)).isRequired,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

IconButton.defaultProps = {
  label: '',
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export { IconButton };
