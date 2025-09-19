const titlesMap = {
  mr: 'Sr.',
  ms: 'Sra./Srta.',
  mrs: 'Sra.',
  miss: 'Srta.',
  dr: 'Dr.',
};

const genereMap = {
  male: 'Masculino',
  female: 'Femenino',
  other: 'Otro',
};

export const translateTitle = (value) => {
  return titlesMap[value] || value;
};

export const translateGender = (value) => {
  return genereMap[value] || value;
}

