import SearchInput from "src/components/Searchinput";
import List from "src/components/list";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function SearchPage() {
  const [searchValue, setSearchValue] = useState("");

  const debounced = useDebounce(searchValue,800);

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Wikipedia Search
      </h1>

      {/* Search Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>

      {/* Results */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Results
        </h2>

        <List searchTerm={debounced} />
      </div>
    </div>
  );
}

export default SearchPage;