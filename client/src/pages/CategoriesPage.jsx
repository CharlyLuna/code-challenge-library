import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { EditIcon } from '../components/EditIcon'
import { DeleteIcon } from '../components/DeleteIcon'
import { CategoriesContext } from '../context/CategoriesContext'
import { useNavigate } from 'react-router-dom'
import { isValidName } from '../utils/validations'

export const CategoriesPage = () => {
  const { onInputChange, onResetForm, name, description, formState } = useForm({ name: '', description: '' })
  const { getCategories, createCategory, deleteCategory, categories } = useContext(CategoriesContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!isValidName(name)) {
      return setError('Invalid name')
    }
    createCategory(formState)
    onResetForm()
  }
  return (
    <>
      <main>
        <h1>Categories</h1>
        <table className='categories-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button onClick={() => navigate(`/categories/${category._id}`)}><EditIcon /></button>
                    <button onClick={() => deleteCategory(category._id)}><DeleteIcon /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <form onSubmit={handleSubmit} className='creation-form'>
          <h2>Create new category</h2>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' name='description' value={description} required onChange={onInputChange} />
          <button type='submit'>Crear</button>
          {error && <p className='error'>{error}</p>}
        </form>
      </main>
    </>
  )
}
