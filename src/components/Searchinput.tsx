import { ChangeEvent } from "react";

type SearchInputProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

function SearchInput({
  searchValue,
  setSearchValue,
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder="Search Wikipedia..."
    />
  );
}

export default SearchInput;