import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a constituency or candidate"
        style={{
          flexGrow: 1,
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ced4da",
          color: "#000",
          backgroundColor: "#fff",
        }}
      />
      <button
        style={{
          padding: "0.5rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          marginLeft: "0.5rem",
        }}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
