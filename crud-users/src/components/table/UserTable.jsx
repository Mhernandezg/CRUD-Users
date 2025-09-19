import { useState, useMemo } from 'react';
import useStoreData from '../../store/storeData';
import SearchInput from './SearchInput';

const UserTable = () => {
  const { users } = useStoreData();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => `${user.id}`.includes(search));
  }, [users, search]);

  return (
    <div className="user-table">
      <SearchInput onSearch={setSearch} />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button>Ver</button>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && <p>No se encontraron usuarios.</p>}
    </div>
  );
};

export default UserTable;
