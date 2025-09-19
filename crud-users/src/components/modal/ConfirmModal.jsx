const ConfirmModal = ({ type, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <h3>{type === "success" ? "Éxito en la operación" : "Error en la operación"}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ConfirmModal;