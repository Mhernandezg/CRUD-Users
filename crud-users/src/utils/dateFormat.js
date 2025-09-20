const dateFormat = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const day = String(date.getDate()).padStart(2, '0'); // dd
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mm (0-indexed)
  const year = date.getFullYear(); // yyyy

  return `${day}/${month}/${year}`;
};

export default dateFormat;
