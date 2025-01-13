import { Loader } from '@mantine/core'
import { createContext, ReactNode, useContext } from 'react'
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query'
import { getSubscription } from '../../api'
import { subscription } from '../../interface'
import { QueryKeys } from '../../types'
import { UserLoged } from '../user/user'


const SubscriptionContext = createContext<{
    subscription: subscription[]
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => any;
    // @ts-ignore
}>(null);

export const SubscriptionContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = UserLoged()
    const { data, refetch, isLoading } = useQuery({ queryKey: [QueryKeys.subscription, user._id], queryFn: () => getSubscription({ userTo: user._id }) })

    return (
        <SubscriptionContext.Provider value={{ subscription: data, refetch }}>
            {isLoading ? <Loader /> : children}
        </SubscriptionContext.Provider>
    )
}

export const useSubscription = () => useContext(SubscriptionContext)
