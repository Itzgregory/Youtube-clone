import { Loader, Text } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getUserLoged } from '../../api/user/user';
import { User } from '../../interface/user/user';
import { QueryKeys } from '../../types/index';

interface UserContextType {
  user: User | null;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<any>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  refetch: async () => undefined
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error, refetch } = useQuery<User, Error>(
    QueryKeys.user, 
    getUserLoged
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <UserContext.Provider value={{ user: data ?? null, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserLoged = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserLoged must be used within a UserContextProvider');
  }
  return context;
};