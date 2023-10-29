import { useContext, useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { isValidName } from '../utils/validations'
import { formatDate } from '../utils/functions'
import { CategoriesContext } from '../context/CategoriesContext'
import { UsersContext } from '../context/UsersContext'
import './BooksForm.scss'

export const BooksForm = ({ initialState, onSubmit, navigate, action }) => {
  const { getCategories, categories } = useContext(CategoriesContext)
  const { getUsers, users } = useContext(UsersContext)
  const [error, setError] = useState(null)
  const { onInputChange, onResetForm, name, author, publicationDate, formState, category, user } = useForm(initialState)

  useEffect(() => {
    if (categories.length < 1) getCategories()
    if (categories.length < 1) getUsers()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // category needs to be send as an array
    const formData = new FormData(e.target)
    const categories = formData.getAll('category')
    setError(null)
    if (!isValidName(name) || !isValidName(author) || !publicationDate || categories.length < 1) {
      return setError('The values are invalid')
    }

    if (user === '') {
      onSubmit({ ...formState, category: categories, user: null })
    } else {
      onSubmit({ ...formState, category: categories })
    }
    onResetForm()

    if (navigate) navigate()
  }

  const checkCategory = (id) => {
    return category.includes(id)
  }

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='model-form'>
        <h2>{action} Book</h2>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={name} required onChange={onInputChange} />
        <label htmlFor='author'>Author</label>
        <input type='text' id='author' name='author' value={author} required onChange={onInputChange} />
        <label htmlFor='publicationDate'>Publication date</label>
        <input type='date' id='publicationDate' name='publicationDate' value={formatDate(publicationDate)} required onChange={onInputChange} />
        <label htmlFor='category'>Category</label>
        <div className='check-selection'>
          {
        categories.map(category => (
          <div className='check' key={category._id}>
            <input type='checkbox' id='category' name='category' value={category._id} defaultChecked={checkCategory(category._id)} />
            <label htmlFor={category._id}>{category.name}</label>
          </div>
        ))
      }
        </div>
        <label htmlFor='user'>User</label>
        <select name='user' id='user' onChange={onInputChange} defaultValue={user ?? ''}>
          <option value=''>Select an option</option>
          {
          users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))
        }
        </select>
        <button type='submit'>{action}</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}
