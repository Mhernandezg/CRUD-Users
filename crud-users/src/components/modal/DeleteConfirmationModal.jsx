const ConfirmDeleteModal = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Eliminar usuario?</h3>
        <p>¿Seguro que deseas eliminar a <strong>{user.firstName} {user.lastName}</strong>?</p>
        <div className="actions">
          <button onClick={onConfirm} className="danger">Eliminar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
