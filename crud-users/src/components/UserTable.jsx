import { useState, useMemo } from 'react';
import useStoreData from '../store/storeData';
import useDeleteUser from '../hooks/useDeleteUser';
import SearchInput from './table/SearchInput';
import UserRow from './table/UserRow';
import UserModalInformation from './modal/UserModalInformation';
import CreateUserModal from './modal/CreateUserModal';
import ConfirmDeleteModal from './modal/DeleteConfirmationModal';
import ConfirmModal from './modal/ConfirmModal';
import EditUserModal from './modal/EditUserModal';

const UserTable = () => {
  const { users, loadingTable, errorTable } = useStoreData();
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUserId, setEditedUserId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const deleteUser = useDeleteUser();
  const [userToDelete, setUserToDelete] = useState(null);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => `${user.id}`.includes(search));
  }, [users, search]);

  const handleView = (user) => {
    setSelectedUserId(user.id);
  };

  const handleEditUser = (user) => {
    setEditedUserId(user.id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };
  const handleDeleteConfirm = async () => {
    const { id } = userToDelete;
    if (!id) return;
    const res = await deleteUser(id);
    console.log('res', res);
    setFeedback({ show: true, type: res.success ? 'success' : 'error', message: res.message });
    setUserToDelete(null);
  };

  const bodyTable = (
    <tbody>
      {filteredUsers.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onView={handleView}
          onEdit={handleEditUser}
          onDelete={() => setUserToDelete(user)}
        />
      ))}
    </tbody>
  );

  const emptyBody = (
    <tbody>
      <tr>
        <td colSpan="4">No se encontraron usuarios</td>
      </tr>
    </tbody>
  );

  const loadingBody = (
    <tbody>
      <tr>
        <td colSpan="4">Cargando datos de usuarios...</td>
      </tr>
    </tbody>
  );

  const errorBody = (
    <tbody>
      <tr>
        <td colSpan="4">Error: {errorTable}</td>
      </tr>
    </tbody>
  );

  return (
    <div className="user-table">
      <SearchInput onSearch={setSearch} onCreate={() => setShowCreateModal(true)} />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {loadingTable
          ? loadingBody
          : errorTable
            ? errorBody
            : filteredUsers.length === 0
              ? emptyBody
              : bodyTable}
      </table>
      {selectedUserId && (
        <UserModalInformation userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {userToDelete && (
        <ConfirmDeleteModal
          user={userToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setUserToDelete(null)}
        />
      )}

      {feedback.show && (
        <ConfirmModal
          type={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback({ show: false, type: '', message: '' })}
        />
      )}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onUserCreated={(newUser) => {
            setFeedback({
              show: true,
              type: newUser.success ? 'success' : 'error',
              message: newUser.message,
            });
          }}
        />
      )}
      {editedUserId && (
        <EditUserModal
          userId={editedUserId}
          onClose={() => setEditedUserId(null)}
          onUserUpdated={(updatedUser) => {
            setFeedback({ show: true, type: 'success', message: 'Usuario actualizado con éxito' });
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
