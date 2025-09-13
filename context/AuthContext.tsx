
import React, { createContext, useState, ReactNode } from 'react';
import type { User } from '../types';
// FIX: Import UserRole and MOCK_REQUESTER_USER to implement login functionality.
import { MOCK_DONOR_USER, MOCK_REQUESTER_USER } from '../constants';
import { UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  updateUser: (updatedUser: Partial<User>) => void;
  // FIX: Add 'login' to the context type to match its usage in LoginPage.tsx.
  login: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_DONOR_USER);

  const updateUser = (updatedFields: Partial<User>) => {
    if(user){
      setUser(prevUser => prevUser ? { ...prevUser, ...updatedFields } : null);
    }
  };

  // FIX: Implement the 'login' function to set the user based on the selected role.
  const login = (role: UserRole) => {
    if (role === UserRole.DONOR) {
      setUser(MOCK_DONOR_USER);
    } else if (role === UserRole.REQUESTER) {
      setUser(MOCK_REQUESTER_USER);
    }
  };

  return (
    // FIX: Provide the 'login' function through the context.
    <AuthContext.Provider value={{ user, updateUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
