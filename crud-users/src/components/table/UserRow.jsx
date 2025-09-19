import React from 'react';
import UserImage from './UserImage';
import PropTypes from 'prop-types';
import { translateTitle, translateGender } from '../../utils/translateTitle';

const fallBackImage =
  'https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785406-stock-illustration-hand-drawn-modern-man-avatar.jpg';
const UserRow = ({ user, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user?.id}</td>
      <td>{`${translateTitle(user?.title||'')} ${user?.firstName} ${user?.lastName}`}</td>
      <td>
        <UserImage
          image={user?.picture}
          altImage={`${user?.firstName} ${user?.lastName}`}
          backUpImage={fallBackImage}
        />
      </td>
      <td>
        <button onClick={() => onView(user)}>Ver</button>
        <button onClick={() => onEdit(user)}>Editar</button>
        <button onClick={() => onDelete(user?.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired, // si viene como string desde la API
    title: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(UserRow);
