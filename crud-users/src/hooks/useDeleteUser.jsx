import useStoreData from '../store/storeData';
import { apiClient } from '../utils/apiClient';

const useDeleteUser = () => {
  const { deleteUser, setLoading, setError } = useStoreData();

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await apiClient(`/user/${userId}`, { method: 'DELETE' });
      deleteUser(userId);
      setError(null);
      return { success: true, message: 'Usuario eliminado con éxito' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: `Error al eliminar usuario: ${err.message}` };
    } finally {
      setLoading(false);
    }
  };

  return handleDeleteUser;
};

export default useDeleteUser;
