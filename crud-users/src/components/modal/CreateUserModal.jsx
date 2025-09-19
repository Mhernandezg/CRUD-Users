import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from '../../utils/validations';
import useCreateUser from '../../hooks/useCreateUser';
import useStoreData from '../../store/storeData';

const CreateUserModal = ({ onClose, onUserCreated }) => {
  const { loading, error } = useStoreData();
  const { createUser } = useCreateUser();

  const {
    register,
    handleSubmit,
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
    const newUser = await createUser(data);
    if (newUser.success) {
      onUserCreated(newUser);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h2>Crear Usuario</h2>

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
          <input type="email" {...register('email')} />
          <p className="error">{errors.email?.message}</p>
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
            {loading ? 'Creando...' : 'Guardar'}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
