import { apiClient } from '../utils/apiClient';
import useStoreData from '../store/storeData';

const useCreateUser = () => {
  const { setLoading, setError } = useStoreData();

  const createUser = async (newUser) => {
    setLoading(true);
    try {
      const data = await apiClient('/user/create', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });
      //addUser(data);
      setError(null);
      return { success: true, message: 'Usuario creado con éxito', data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: `Error al crear usuario: ${err.message}` };
    } finally {
      setLoading(false);
    }
  };

  return { createUser };
};

export default useCreateUser;
