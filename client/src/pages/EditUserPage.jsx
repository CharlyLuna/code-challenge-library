import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../context/UsersContext'
import { isValidEmail, isValidName } from '../utils/validations'

export const EditUserPage = () => {
  const [error, setError] = useState(null)
  const { getUserById, updateUser } = useContext(UsersContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useMemo(() => getUserById(id), [id])
  console.log(user)
  const { onInputChange, formState, name, email } = useForm({
    name: user.name,
    email: user.email
  })

  useEffect(() => {
    console.log(user)
    console.log(formState)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    console.log(formState)
    if (!isValidName(name) || !isValidEmail(email)) {
      return setError('Invalid name or email')
    }
    updateUser(id, formState)
    navigate('/users')
  }

  return (
    <>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className='creation-form'>
        <h2>Create new user</h2>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' value={email} required onChange={onInputChange} />
        <button type='submit'>Edit</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </>
  )
}
