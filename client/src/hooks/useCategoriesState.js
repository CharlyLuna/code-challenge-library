import { useState } from 'react'

export const useCategoriesState = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  const createCategory = async (user) => {
    try {
      const result = await fetch('http://localhost:3001/library/categories', {
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
      setCategories([...categories, data])
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const getCategories = async () => {
    try {
      const result = await fetch('http://localhost:3001/library/categories')
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const { data } = await result.json()
      console.log(data)
      setCategories(data)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      const result = await fetch(`http://localhost:3001/library/categories/${id}`, {
        method: 'DELETE'
      })
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const newUsers = categories.filter(user => user._id !== id)
      setCategories(newUsers)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const getCategoryById = (id) => {
    console.log('getting user by id')
    return categories.find(user => user._id === id)
  }

  const updateCategory = async (id, user) => {
    try {
      const result = await fetch(`http://localhost:3001/library/categories/${id}`, {
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
    categories,
    createCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
    getCategories,
    error
  }
}
