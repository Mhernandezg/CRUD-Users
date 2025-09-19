import * as yup from 'yup';

const validations = yup.object().shape({
  title: yup.string().required('El título es obligatorio'),
  firstName: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  picture: yup
    .string()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i, 'La URL debe ser de una imagen (jpg, png, gif, webp)')
    .nullable(),
  gender: yup.string().required('El género es obligatorio'),
  email: yup.string().email('Correo inválido').required('El email es obligatorio'),
  dateOfBirth: yup
    .date()
    .required('La fecha de nacimiento es obligatoria')
    .typeError('Formato de fecha no válido'),
  phone: yup.string().required('El teléfono es obligatorio'),
});

export default validations;
