import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { isValidEmail, isValidName } from '../utils/validations'

export const UsersForm = ({ onSubmit, navigate, initialState, action }) => {
  const [error, setError] = useState(null)
  const { onInputChange, onResetForm, name, email, formState } = useForm(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!isValidName(name) || !isValidEmail(email)) {
      return setError('Invalid values')
    }
    onSubmit(formState)
    onResetForm()
    if (navigate) navigate()
  }

  return (
    <form onSubmit={handleSubmit} className='model-form'>
      <h2>{action} User</h2>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' name='email' value={email} required onChange={onInputChange} />
      <button type='submit'>{action}</button>
      {error && <p className='error'>{error}</p>}
    </form>
  )
}
