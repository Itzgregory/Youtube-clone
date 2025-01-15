import { Loader, Text } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getUserLoged } from '../../api/user/user';
import { User } from '../../interface/user/user';
import { QueryKeys } from '../../types/index';

const UserContext = createContext<{
    user: User | null;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => any;
} | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, error, refetch } = useQuery<User, Error>(QueryKeys.user, getUserLoged);

    const user = data ?? null;

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <UserContext.Provider value={{ user, refetch }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserLoged = () => {
    const context = useContext(UserContext);
    if (!context || context.user === null) {
      return { user: null, refetch: () => {} }; 
    }
    return context;
  };
  