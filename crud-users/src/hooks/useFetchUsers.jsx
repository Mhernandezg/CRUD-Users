import { useEffect } from 'react';
import useStoreData from '../store/storeData';
import { apiClient } from '../utils/apiClient';

const useFetchUsers = () => {
  const { setUsers, setLoading, setError } = useStoreData();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await apiClient('/user');
        setUsers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setLoading, setError]);
};

export default useFetchUsers;
