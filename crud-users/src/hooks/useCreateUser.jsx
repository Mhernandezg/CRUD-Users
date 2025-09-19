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
      return { success: true, message: 'Usuario creado con éxito', data };
      return data;
    } catch (err) {
      setError(err.message);
      return { success: false, message: `Error al crear usuario: ${err.message}` };
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser };
};

export default useCreateUser;
