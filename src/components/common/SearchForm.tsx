import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchFormProps {
  onSearch: (value: string) => void;
  placeholder: string;
  containerClassName?: string;
  inputClassName?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  placeholder,
  containerClassName = "",
  inputClassName = "",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the onSearch function with the current input value
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Prevent the default behavior of the Enter key, which submits forms
      event.preventDefault();
    }
  };

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={`text-white focus:caret-white rounded-[10px] bg-[#333333] py-[10px] px-[22px] w-full border-0 outline-0 ${inputClassName}`}
      />
      <CiSearch
        className="text-white cursor-pointer absolute right-4 inset-y-2 items-center flex"
        size="25"
      />
    </div>
  );
};

export default SearchForm;
