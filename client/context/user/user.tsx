import { Loader } from '@mantine/core'
import { createContext, ReactNode, useContext } from 'react'
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query'
import { getUserLoged } from '../../api'
import { User } from '../../interface'
import { QueryKeys } from '../../types'

const UserContext = createContext<{
    user: User;
    refetch: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => any;
    // @ts-ignore
  }>(null);

export const UserContextProvider = ({children}:{children: ReactNode}) => {  
    const {data, isLoading, refetch} = useQuery(QueryKeys.user, getUserLoged)  
  return (
    <UserContext.Provider value={{user: data, refetch}}>
        {isLoading ? <Loader/> : children}

    </UserContext.Provider>
  )
}

export const UserLoged = () => useContext(UserContext)

