import { Loader } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getSubscription } from '../../api';
import { subscription } from '../../interface';
import { QueryKeys } from '../../types';
import { UserLoged } from '../user/user';

interface SubscriptionContextType {
  subscription: subscription[] | undefined;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<any>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: undefined,
  refetch: async () => undefined
});

export const SubscriptionContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = UserLoged();
  const { data, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.subscription, user?._id],
    queryFn: () => (user?._id ? getSubscription({ userTo: user._id }) : undefined),
    enabled: !!user?._id,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SubscriptionContext.Provider value={{ subscription: data, refetch }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionContextProvider');
  }
  return context;
};