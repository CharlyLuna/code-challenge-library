import { useContext, useEffect, useState } from 'react'
import { DeleteIcon } from '../components/DeleteIcon'
import { EditIcon } from '../components/EditIcon'
import { useForm } from '../context/useForm'
import { UsersContext } from '../context/UsersContext'
import './UsersPage.scss'
import { isValidEmail, isValidName } from '../utils/validations'

export const UsersPage = () => {
  const { onInputChange, onResetForm, name, email, formState } = useForm({ name: '', email: '' })
  const { createUser, getUsers, users } = useContext(UsersContext)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!isValidName(name) || !isValidEmail(email)) {
      return setError('Invalid name or email')
    }
    createUser(formState)
    onResetForm()
  }

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
                    <button onClick={() => console.log(user._id)}><EditIcon /></button>
                    <button onClick={() => console.log(user._id)}><DeleteIcon /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <form onSubmit={handleSubmit} className='creation-form'>
          <h2>Create new user</h2>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={email} required onChange={onInputChange} />
          <button type='submit'>Crear</button>
          {error && <p className='error'>{error}</p>}
        </form>
      </main>
    </>
  )
}
