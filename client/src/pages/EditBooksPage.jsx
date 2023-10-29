import React, { useContext, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext'
import { BooksForm } from '../components/BooksForm'

export const EditBooksPage = () => {
  const { getBookById, updateBook } = useContext(BooksContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const book = useMemo(() => getBookById(id), [id])
  const initialState = {
    name: book?.name,
    author: book?.author,
    publicationDate: book?.publicationDate,
    category: book?.category.map(category => category._id),
    user: book?.user?._id
  }

  console.log(book?.user?.name)

  if (!book) return <Navigate to='/books' />

  const onSubmit = (formState) => updateBook(id, formState)

  return (
    <>
      <BooksForm initialState={initialState} onSubmit={onSubmit} navigate={() => navigate('/books')} action='Edit' />
    </>
  )
}
