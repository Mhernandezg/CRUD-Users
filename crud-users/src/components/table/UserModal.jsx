import UserImage from './UserImage';
import useUserDetail from '../../hooks/useUserDetail';
import PropTypes from 'prop-types';

const UserModal = ({ userId, onClose }) => {
  const { user, loading, error } = useUserDetail(userId);
  console.log(user);

  if (!userId) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {loading && <p>Cargando detalles...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && user && (
          <>
            <div className="modal-UserInfo">
              <h2 className="modal-title">{`${user.title} ${user.firstName} ${user.lastName}`}</h2>
              <span>ID:</span> {user.id}
            </div>
            <UserImage
              image={user.picture}
              altImage={`${user.firstName} ${user.lastName}`}
              backUpImage="https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785406-stock-illustration-hand-drawn-modern-man-avatar.jpg"
            />
          </>
        )}
      </div>
    </div>
  );
};

UserModal.propTypes = {
  userId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default UserModal;
