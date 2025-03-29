'use client';

import { ReactNode, useState } from 'react';
import RoleContext from './RoleContext';

interface RoleProviderProps {
  children: ReactNode;
}

const RoleProvider = ({ children }: RoleProviderProps) => {
  const [role, setRole] = useState<string>('User'); // Default role

  return (
    <RoleContext.Provider value= {{ role, setRole }}>
  { children }
  </RoleContext.Provider>
  );
};

export default RoleProvider;
