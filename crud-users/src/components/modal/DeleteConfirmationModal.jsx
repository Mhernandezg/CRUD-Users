import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Eliminar usuario?</h3>
        <p>
          ¿Seguro que deseas eliminar a{' '}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ?
        </p>
        <div className="actions">
          <button onClick={onConfirm} className="danger">
            Eliminar
          </button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
