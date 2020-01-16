import React, { useState } from 'react';

type Props = {
  search: (searchValue: string) => void
};

const Search: React.FC<Props> = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const resetInputValue = () => {
    setSearchValue("");
  }

  const callSearchFunction = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.search(searchValue);
    resetInputValue();
  }

  return (
    <form className="search">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <input
        type="submit"
        value="Search"
        onClick={callSearchFunction}
      />
    </form>
  );
};

export default Search;
