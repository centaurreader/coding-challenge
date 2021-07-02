import React, { ReactNode } from 'react';

const FilterBar: React.FC<{
  children: ReactNode,
}> = ({ children }) => (
  <div className="filter__bar u-pa-sm">
    {children}
  </div>
);

export default FilterBar;
