import React, { ReactNode } from 'react';

const Card: React.FC<{
  children: ReactNode,
}> = ({ children }) => (
  <div className="card u-pa-lg u-pb-xl">
    {children}
  </div>
);

export default Card;
