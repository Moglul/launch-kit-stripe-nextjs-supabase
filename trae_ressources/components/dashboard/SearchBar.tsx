
import React from 'react';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2 bg-construction-100/50 border-0 rounded-md text-sm text-construction-800 placeholder-construction-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-construction-500" />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-2.5"
        >
          <X className="h-4 w-4 text-construction-500" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
