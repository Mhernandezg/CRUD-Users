import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ onSearch, onCreate }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <div className='search-container'>
      <input
        id="search"
        type="text"
        placeholder="Buscar por Id del usuario..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <button onClick={onCreate}>+ Crear Usuario</button>
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchInput;
