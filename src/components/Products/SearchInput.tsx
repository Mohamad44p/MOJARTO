import { FC } from "react";
import { Input } from "../ui/input";
import { debounce } from "lodash";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
  }
const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const debounceSearch = debounce((value: string) => {
    onChange(value);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search products"
      onChange={handleSearchChange}
      className="w-full sm:w-1/2 lg:w-1/3"
    />
  );
};

export default SearchInput;
