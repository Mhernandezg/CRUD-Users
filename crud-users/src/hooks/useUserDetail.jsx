import { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';
import useStoreData from '../store/storeData';

const useUserDetail = (userId) => {
  const { userDetails, setUserDetail, setLoading, setError } = useStoreData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }
    setUser(null);

    if (userDetails[userId]) {
      setUser(userDetails[userId]);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await apiClient(`/user/${userId}`);
        setUser(data);
        setUserDetail(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, userDetails, setUserDetail]);

  return { user };
};

export default useUserDetail;
