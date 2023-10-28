import { createContext } from 'react'
import { useUsersState } from '../hooks/useUsersState'

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
  const { createUser, deletUser, getUsers, getUserById, updateUser, users, error } = useUsersState()

  return (
    <UsersContext.Provider value={{ users, createUser, deletUser, getUserById, updateUser, getUsers, serverError: error }}>
      {children}
    </UsersContext.Provider>
  )
}
