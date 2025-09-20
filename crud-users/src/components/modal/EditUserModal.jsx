import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from '../../utils/validations';
import useUpdateUser from '../../hooks/useUserUpdate';
import useStoreData from '../../store/storeData';
import ConfirmModal from './ConfirmModal';
import useUserDetail from '../../hooks/useUserDetail';

const EditUserModal = ({ userId, onClose, onUserUpdated }) => {
  const { user } = useUserDetail(userId);
  const { loading, error } = useStoreData();
  const { updateUserData } = useUpdateUser();
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      picture: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      phone: '',
    },
  });

  const onSubmit = async (data) => {
    const res = await updateUserData(user.id, data);
    if (res.success) {
      onUserUpdated(res.data);
      setFeedback({ show: true, type: 'success', message: res.message });
      onClose();
    } else {
      setFeedback({ show: true, type: 'error', message: res.message });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split('T')[0] // yyyy-MM-dd
          : '',
      });
    }
  }, [user, reset]);

  if (!user) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="modal-overlay">
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <h2 className="modal-title">Editar Usuario</h2>

          <p>
            <strong>ID:</strong> {user?.id}
          </p>

          <label>
            Título:
            <select {...register('title')}>
              <option value="">-- select --</option>
              <option value="mr">Mr</option>
              <option value="ms">Ms</option>
              <option value="mrs">Mrs</option>
              <option value="miss">Miss</option>
              <option value="dr">Dr</option>
            </select>
            <p className="error">{errors.title?.message}</p>
          </label>

          <label>
            Nombres:
            <input {...register('firstName')} />
            <p className="error">{errors.firstName?.message}</p>
          </label>

          <label>
            Apellidos:
            <input {...register('lastName')} />
            <p className="error">{errors.lastName?.message}</p>
          </label>

          <label>
            Imagen:
            <input {...register('picture')} placeholder="URL string imagen" />
            <p className="error">{errors.picture?.message}</p>
          </label>

          <label>
            Género:
            <select {...register('gender')}>
              <option value="">-- select --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="error">{errors.gender?.message}</p>
          </label>

          <label>
            Correo electrónico:
            <input
              type="email"
              {...register('email')}
              readOnly
              disabled
              className="input-disabled"
            />
          </label>

          <label>
            Fecha de nacimiento:
            <input type="date" {...register('dateOfBirth')} />
            <p className="error">{errors.dateOfBirth?.message}</p>
          </label>

          <label>
            Teléfono:
            <input {...register('phone')} />
            <p className="error">{errors.phone?.message}</p>
          </label>

          {error && <p className="error">{error}</p>}

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      {feedback.show && (
        <ConfirmModal
          type={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback({ show: false, type: '', message: '' })}
        />
      )}
    </>
  );
};

export default EditUserModal;
