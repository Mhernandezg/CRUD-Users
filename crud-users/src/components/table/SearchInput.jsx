import { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por Id del usuario..."
      value={query}
      onChange={handleChange}
      className="search"
    />
  );
};

export default SearchInput;
