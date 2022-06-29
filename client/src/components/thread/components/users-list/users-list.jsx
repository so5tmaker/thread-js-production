import PropTypes from 'prop-types';
import { UserItem, UserList } from './users-list.styled.jsx';

const UsersList = ({ users, top, left }) => {
  const userArray = users?.map(user => {
    return <UserItem key={user}>{user}</UserItem>;
  });
  return (
    <div>
      {users && (
        <UserList top={top} left={left}>
          {userArray}
        </UserList>
      )}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

UsersList.defaultProps = {
  users: undefined
};

export { UsersList };
