import { useState } from 'react'

export const useUsersState = () => {
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
  }

  const getUsers = async () => {
    try {
      const result = await fetch('http://localhost:3001/library/users')
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const { data } = await result.json()
      console.log(data)
      setUsers(data)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const deletUser = async (id) => {
    try {
      const result = await fetch(`http://localhost:3001/library/users/${id}`, {
        method: 'DELETE'
      })
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const newUsers = users.filter(user => user._id !== id)
      setUsers(newUsers)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const getUserById = (id) => {
    console.log('getting user by id')
    return users.find(user => user._id === id)
  }

  const updateUser = async (id, user) => {
    try {
      const result = await fetch(`http://localhost:3001/library/users/${id}`, {
        method: 'PATCH',
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
      console.log(data)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return {
    users,
    createUser,
    deletUser,
    getUserById,
    updateUser,
    getUsers,
    error
  }
}