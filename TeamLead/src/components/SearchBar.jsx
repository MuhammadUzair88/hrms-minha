import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search" }) => {
  return (
    <div className="w-full sm:w-64 px-4 py-2 bg-neutral-200/30 rounded-md">
      <div className="flex items-center gap-2">
        <Search size={18} className="text-zinc-900" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm text-zinc-900/70 placeholder:text-zinc-900/50 w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
