import React from 'react';
import UserImage from './UserImage';
import PropTypes from 'prop-types';
import { translateTitle } from '../../utils/translateTitle';

const fallBackImage = import.meta.env.VITE_FALLBACK_IMAGE;
const UserRow = ({ user, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="Id">{user?.id}</td>
      <td data-label="Nombre">{`${translateTitle(user?.title || '')} ${user?.firstName} ${user?.lastName}`}</td>
      <td data-label="Foto">
        <UserImage
          image={user?.picture}
          altImage={`${user?.firstName} ${user?.lastName}`}
          backUpImage={fallBackImage}
        />
      </td>
      <td data-label="Acciones">
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
