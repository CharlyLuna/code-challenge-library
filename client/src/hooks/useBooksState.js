import { useState } from 'react'

export const useBooksState = () => {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  const createBook = async (book) => {
    try {
      setError(null)
      const result = await fetch('http://localhost:3001/library/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const { data } = await result.json()
      setBooks([...books, data])
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const getBooks = async () => {
    try {
      setError(null)
      const result = await fetch('http://localhost:3001/library/books')
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const { data } = await result.json()
      setBooks(data)
      console.log('get books')
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const deleteBook = async (id) => {
    try {
      setError(null)
      const result = await fetch(`http://localhost:3001/library/books/${id}`, {
        method: 'DELETE'
      })
      if (!result.ok) {
        const { message } = await result.json()
        throw new Error(message)
      }
      const newBooks = books.filter(book => book._id !== id)
      setBooks(newBooks)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const getBookById = (id) => {
    return books.find(book => book._id === id)
  }

  const updateBook = async (id, book) => {
    try {
      setError(null)
      const result = await fetch(`http://localhost:3001/library/books/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
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
    books,
    createBook,
    deleteBook,
    getBookById,
    updateBook,
    getBooks,
    error
  }
}
