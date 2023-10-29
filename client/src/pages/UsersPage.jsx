import { useContext, useEffect } from 'react'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { UsersContext } from '../context/UsersContext'
import './UsersPage.scss'
import { useNavigate } from 'react-router-dom'
import { UsersForm } from '../components/UsersForm'

const initialState = {
  name: '',
  email: ''
}

export const UsersPage = () => {
  const { createUser, getUsers, deletUser, users } = useContext(UsersContext)
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])

  const onSubmit = (form) => createUser(form)

  return (
    <>
      <main className='users-page'>
        <h1>Users</h1>
        <table className='users-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Has borrowed a book</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
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
          </tbody>
        </table>

        <UsersForm initialState={initialState} onSubmit={onSubmit} action='Create' />
      </main>
    </>
  )
}
