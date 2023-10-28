import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoriesContext } from '../context/CategoriesContext'
import { useForm } from '../hooks/useForm'
import { isValidName } from '../utils/validations'

export const EditCategoriesPage = () => {
  const [error, setError] = useState(null)
  const { getCategoryById, updateCategory } = useContext(CategoriesContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const category = useMemo(() => getCategoryById(id), [id])
  const { onInputChange, formState, name, description } = useForm({
    name: category.name,
    description: category.description
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    console.log(formState)
    if (!isValidName(name)) {
      return setError('Invalid name')
    }
    updateCategory(id, formState)
    navigate('/categories')
  }

  return (
    <>
      <h1>Edit category</h1>
      <form onSubmit={handleSubmit} className='creation-form'>
        <h2>Create new category</h2>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' name='description' value={description} required onChange={onInputChange} />
        <button type='submit'>Edit</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </>
  )
}
