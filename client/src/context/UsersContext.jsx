import { createContext, useState } from 'react'

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const createUser = async (user) => {
    try {
      const result = await fetch('http://localhost:3001/library/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const { data } = await result.json()
      setUsers([...users, data])
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
    // .then(data => {
    //   setUsers([...users, data])
    // })
  }

  const getUsers = async () => {
    try {
      const result = await fetch('http://localhost:3001/library/users')
      if (!result.ok) throw new Error('Error fetching users')
      const { data } = await result.json()
      console.log(data)
      setUsers(data)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  return (
    <UsersContext.Provider value={{ users, createUser, getUsers, serverError: error }}>
      {children}
    </UsersContext.Provider>
  )
}
