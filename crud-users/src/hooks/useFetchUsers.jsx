import { useEffect } from 'react';
import useStoreData from '../store/storeData';
import { apiClient } from '../utils/apiClient';


const useFetchUsers = () => {
  const { setUsers, setLoadingTable, setErrorTable } = useStoreData();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingTable(true);
      try {
        const data = await apiClient('/user');
        setUsers(data.data);
      } catch (err) {
        setErrorTable(err.message);
      } finally {
        setLoadingTable(false);
      }
    };

    fetchUsers();
  }, [setUsers, setLoadingTable, setErrorTable]);
};

export default useFetchUsers;
