import useStoreData from '../store/storeData';
import { apiClient } from '../utils/apiClient';

const useUpdateUser = () => {
  const { updateUser, setLoading, setError } = useStoreData();

  const updateUserData = async (userId, updatedData) => {
    setLoading(true);
    try {
      const data = await apiClient(`/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      updateUser(data);
      setError(null);
      return { success: true, message: 'Usuario actualizado con éxito', data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: `Error al actualizar usuario: ${err.message}` };
    } finally {
      setLoading(false);
    }
  };

  return { updateUserData };
};

export default useUpdateUser;
