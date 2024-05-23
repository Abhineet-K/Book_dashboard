import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 ">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter your book..."
        className="border-2 border-r-0 border-blue-500 outline-none rounded-l-lg p-2 w-72 font-medium text-lg text-slate-700"
      />
      <button type="submit" className="bg-blue-500 border-2 border-blue-600 hover:bg-blue-600 text-white py-2 rounded-r-lg text-lg font-semibold w-24">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
