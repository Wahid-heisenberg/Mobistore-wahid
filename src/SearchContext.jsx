import React, { createContext, useContext, useState } from 'react';

// Create a context
const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}

// Create a provider component
const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('Tous');
  const [sellsNumber, setSellsNumber] = useState(null);

  const updateSearchValue = (value) => {
    setSearchValue(value);
  };

  const updateSearchCategory = (value) => {
    setSearchCategory(value);
  };
  const updateSellsNumber = (value) => {
    setSellsNumber(value);
  };
  const searchContextValues = { // Renamed from SearchContext
    searchValue,
    searchCategory,
    sellsNumber,
    updateSearchValue,
    updateSearchCategory,
    updateSellsNumber
  };

  return (
    <SearchContext.Provider value={searchContextValues}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
