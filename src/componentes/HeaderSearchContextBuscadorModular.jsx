import React, { createContext, useState } from 'react';

export const HeaderSearchContextBuscadorModular = createContext();

export const HeaderSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <HeaderSearchContextBuscadorModular.Provider value={{ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }}>
      {children}
    </HeaderSearchContextBuscadorModular.Provider>
  );
};
