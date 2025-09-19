import { useState, useMemo } from 'react';
import useStoreData from '../../store/storeData';
import SearchInput from './SearchInput';
import UserRow from './UserRow';
import UserModal from './UserModal';

const UserTable = () => {
  const { users, loading, error } = useStoreData();
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => `${user.id}`.includes(search));
  }, [users, search]);

  const handleView = (user) => {
    setSelectedUserId(user.id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const bodyTable = (
    <tbody>
      {filteredUsers.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onView={handleView}
          onEdit={(u) => console.log('Editar', u)}
          onDelete={(id) => console.log('Eliminar', id)}
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
      <SearchInput onSearch={setSearch} />
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
        <UserModal userId={selectedUserId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserTable;