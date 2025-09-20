import * as yup from 'yup';

const phoneRegex = /^[0-9]{5,15}$/;

const validations = yup.object().shape({
  title: yup
    .string()
    .oneOf(['mr', 'ms', 'mrs', 'miss', 'dr'], 'Título inválido')
    .required('El título es obligatorio'),

  firstName: yup
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras')
    .required('El nombre es obligatorio'),

  lastName: yup
    .string()
    .trim()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El apellido solo puede contener letras')
    .required('El apellido es obligatorio'),

  picture: yup
    .string()
    .trim()
    .test('is-valid-picture', 'La URL de la imagen no es válida', (value) => {
      if (!value) return true;
      return (
        /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(value) ||
        /^file:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value) ||
        /^data:image\/(jpeg|png|gif|webp);base64,/.test(value)
      );
    })
    .nullable(),

  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Género inválido')
    .required('El género es obligatorio'),

  email: yup.string().trim().email('Correo inválido').required('El correo es obligatorio'),

  dateOfBirth: yup
    .date()
    .min(new Date('1900-01-01'), 'La fecha no puede ser menor a 1900')
    .max(new Date(), 'La fecha no puede ser en el futuro')
    .required('La fecha de nacimiento es obligatoria')
    .typeError('Formato de fecha no válido'),

  phone: yup
    .string()
    .trim()
    .matches(phoneRegex, 'Teléfono inválido: solo se permite ingresar números')
    .required('El teléfono es obligatorio'),
});

export default validations;
