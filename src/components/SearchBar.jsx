import React, {useState} from "react";
import { Search } from "lucide-react";

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }
  return (
    <div className="sm:w-13/16 relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="w-full bg-neutral-200 p-3 pl-10 pr-4 rounded outline-none"
      />
    </div>
  );
};

export default SearchBar;
