import { useEffect } from 'react';
import useStoreData from '../store/storeData';
import { apiClient } from '../utils/apiClient';

const usePaginatorUsers = (page = 0, limit = 5) => {
  const { setUsers, setLoadingTable, setErrorTable, setTotal, setPage, setLimit } = useStoreData();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingTable(true);
      try {
        const data = await apiClient(`/user?page=${page}&limit=${limit}`);
        setUsers(data.data);
        setTotal(data.total);   
        setPage(data.page);     
        setLimit(data.limit);
      } catch (err) {
        setErrorTable(err.message);
      } finally {
        setLoadingTable(false);
      }
    };

    fetchUsers();
  }, [page, limit, setUsers, setLoadingTable, setErrorTable, setTotal, setPage, setLimit]);
};

export default usePaginatorUsers;
