import React, { useState } from "react";

const SearchContext = React.createContext({
  searchString: "",
  onStringChange: (value: string) => {},
});

// searchString string gets its value from input in Navbar
// used to show SearchList, set to "" in Navbar after clicking closeButton
// or after choosing pokemon to show in SearchList
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
