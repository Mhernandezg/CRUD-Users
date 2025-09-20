import PropTypes from 'prop-types';

const ConfirmModal = ({ type, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <h3>{type === 'success' ? 'Éxito en la operación' : 'Error en la operación'}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmModal;
