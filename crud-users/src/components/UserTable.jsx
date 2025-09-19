import { useState, useMemo } from 'react';
import useStoreData from '../store/storeData';
import useDeleteUser from '../hooks/useDeleteUser';
import SearchInput from './table/SearchInput';
import UserRow from './table/UserRow';
import UserModalInformation from './modal/UserModalInformation';
import CreateUserModal from './modal/CreateUserModal';

const UserTable = () => {
  const { users, loading, error } = useStoreData();
  console.log('Usuarios desde el store:', users);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const deleteUser = useDeleteUser();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => `${user.id}`.includes(search));
  }, [users, search]);

  const handleView = (user) => {
    setSelectedUserId(user.id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };
  const handleDelete = (id) => {
    deleteUser(id);
  };

  const bodyTable = (
    <tbody>
      {filteredUsers.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onView={handleView}
          onEdit={(u) => console.log('Editar', u)}
          onDelete={handleDelete}
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
        <td colSpan="4">Error: {error}</td>
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
        {loading
          ? loadingBody
          : error
            ? errorBody
            : filteredUsers.length === 0
              ? emptyBody
              : bodyTable}
      </table>
      {selectedUserId && (
        <UserModalInformation userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onUserCreated={(newUser) => {
            console.log('Usuario creado:', newUser);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
