import { createContext } from 'react'
import { useBooksState } from '../hooks/useBooksState'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
  const { books, createBook, deleteBook, getBooks, getBookById, updateBook, error } = useBooksState()
  return (
    <BooksContext.Provider value={{ books, createBook, deleteBook, getBooks, getBookById, updateBook, error }}>
      {children}
    </BooksContext.Provider>
  )
}
