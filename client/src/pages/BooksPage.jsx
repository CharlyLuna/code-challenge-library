import { useContext, useEffect } from 'react'
import { BooksContext } from '../context/BooksContext'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { BooksForm } from '../components/BooksForm'
import { formatCategories, formatReadableDate } from '../utils/functions'
import { Pagination } from '../components/Pagination'
import { usePagination } from '../hooks/usePagination'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'

const initialState = {
  name: '',
  author: '',
  publicationDate: '',
  category: [],
  user: ''
}

export const BooksPage = () => {
  const { getBooks, deleteBook, books, createBook, error } = useContext(BooksContext)
  const navigate = useNavigate()
  const { ItemsToDisplay, currentPage, itemsPerPage, paginate, totalItems } = usePagination({ items: books })

  useEffect(() => {
    getBooks()
  }, [books.length])

  const onSubmit = (form) => createBook(form)

  return (
    <main>
      <Table title='Books' headings={['Name', 'Author', 'Category', 'Publication date', 'User', 'Actions']}>
        {
          ItemsToDisplay.map(book => (
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
      </Table>
      <Modal error={error} />
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate} totalItems={totalItems} />
      <BooksForm initialState={initialState} onSubmit={onSubmit} action='Create' />
    </main>
  )
}
