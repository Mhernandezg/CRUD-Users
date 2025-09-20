import UserImage from '../table/UserImage';
import useUserDetail from '../../hooks/useUserDetail';
import PropTypes from 'prop-types';
import dateFormat from '../../utils/dateFormat';
import { translateTitle, translateGender } from '../../utils/translateTitle';
import useStoreData from '../../store/storeData';

const fallBackImage = import.meta.env.VITE_FALLBACK_IMAGE;

const UserModalInformation = ({ userId, onClose }) => {
  const { user } = useUserDetail(userId);
  const { loading, error } = useStoreData();

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
            <h2 className="modal-title">Detalles del Usuario</h2>
            <div className="modal-userDetails">
              <div className="modal-UserIdentification">
                <h3 className="modal-userName">{`${translateTitle(user?.title)} ${user?.firstName} ${user?.lastName}`}</h3>
                <span>ID:</span> {user?.id}
              </div>
              <UserImage
                image={user?.picture}
                altImage={`${user?.firstName} ${user?.lastName}`}
                backUpImage={fallBackImage}
              />
            </div>
            <div className="modal-userInfo">
              <p>
                <strong>Género:</strong> {translateGender(user?.gender)}
              </p>
              <p>
                <strong>Correo electrónico:</strong> {user?.email}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong>{' '}
                {user?.dateOfBirth && dateFormat(user.dateOfBirth)}
              </p>
              <p>
                <strong>Teléfono:</strong> {user?.phone}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

UserModalInformation.propTypes = {
  userId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default UserModalInformation;
