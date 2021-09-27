import React, { useState } from "react";

const SearchContext = React.createContext({
  searchString: "",
  onStringChange: (value: string) => {},
});

export const SearchContextProvider = (props: any) => {
  const [searchString, setSearchString] = useState<string>("");

  const searchStringHandler = (value: string) => {
    setSearchString(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchString: searchString,
        onStringChange: searchStringHandler,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
