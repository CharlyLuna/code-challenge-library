import { useContext, useEffect } from 'react'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { UsersContext } from '../context/UsersContext'
import { useNavigate } from 'react-router-dom'
import { UsersForm } from '../components/UsersForm'
import { usePagination } from '../hooks/usePagination'
import { Pagination } from '../components/Pagination'
import { Table } from '../components/Table'

const initialState = {
  name: '',
  email: ''
}

export const UsersPage = () => {
  const { createUser, getUsers, deletUser, users } = useContext(UsersContext)
  const navigate = useNavigate()
  const { ItemsToDisplay, currentPage, itemsPerPage, paginate, totalItems } = usePagination({ items: users })

  useEffect(() => {
    getUsers()
  }, [])

  const onSubmit = (form) => createUser(form)

  return (
    <main>
      <Table title='Users' headings={['Name', 'Email', 'Has borrowed a book', 'Actions']}>
        {
          ItemsToDisplay.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.borrowedBooks.length > 0 ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => navigate(`/users/${user._id}`)}><EditIcon /></button>
                <button onClick={() => deletUser(user._id)}><DeleteIcon /></button>
              </td>
            </tr>
          ))
        }
      </Table>

      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate} totalItems={totalItems} />

      <UsersForm initialState={initialState} onSubmit={onSubmit} action='Create' />
    </main>
  )
}
