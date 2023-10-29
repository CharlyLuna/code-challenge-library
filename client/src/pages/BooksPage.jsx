import React, { useContext, useEffect } from 'react'
import { BooksContext } from '../context/BooksContext'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { BooksForm } from '../components/BooksForm'
import { formatCategories, formatReadableDate } from '../utils/functions'

const initialState = {
  name: '',
  author: '',
  publicationDate: '',
  category: [],
  user: ''
}

export const BooksPage = () => {
  const { getBooks, deleteBook, books, createBook } = useContext(BooksContext)
  const navigate = useNavigate()

  useEffect(() => {
    getBooks()
  }, [books.length])

  console.log(books)

  const onSubmit = (form) => createBook(form)

  return (
    <main className='users-page'>
      <h1>Books</h1>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Publication date</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
              books.map(book => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{formatCategories(book.category)}</td>
                  <td>{formatReadableDate(book.publicationDate)}</td>
                  <td>{book.user?.name ?? 'No user'}</td>
                  <td>
                    <button onClick={() => navigate(`/books/${book._id}`)}><EditIcon /></button>
                    <button onClick={() => deleteBook(book._id)}><DeleteIcon /></button>
                  </td>
                </tr>
              ))
            }
        </tbody>
      </table>

      <BooksForm initialState={initialState} onSubmit={onSubmit} action='Create' />
    </main>
  )
}
