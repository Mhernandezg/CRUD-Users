import { useState } from 'react';
import { apiClient } from '../utils/apiClient';
import useStoreData from '../store/storeData';

const useCreateUser = () => {
  const { addUser, setLoading, setError } = useStoreData();

  const createUser = async (newUser) => {
    setLoading(true);
    try {
      const data = await apiClient('/user/create', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
      addUser(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, setLoading, setError };
};

export default useCreateUser;
