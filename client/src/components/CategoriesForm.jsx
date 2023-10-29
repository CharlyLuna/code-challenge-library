import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { isValidName } from '../utils/validations'

export const CategoriesForm = ({ initialState, onSubmit, action, navigate }) => {
  const [error, setError] = useState(null)
  const { onInputChange, onResetForm, name, description, formState } = useForm(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!isValidName(name)) {
      return setError('The values are invalid')
    }
    onSubmit(formState)
    onResetForm()
    if (navigate) navigate()
  }

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='model-form'>
        <h2>{action} category</h2>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' name='description' value={description} required onChange={onInputChange} />
        <button type='submit'>{action}</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}
