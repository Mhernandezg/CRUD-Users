const dateFormat = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const options = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('es-CO', options).format(date);
};

export default dateFormat;
