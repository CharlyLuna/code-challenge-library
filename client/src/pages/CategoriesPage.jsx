import { useContext, useEffect } from 'react'
import { EditIcon } from '../components/icons/EditIcon'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { CategoriesContext } from '../context/CategoriesContext'
import { useNavigate } from 'react-router-dom'
import { CategoriesForm } from '../components/CategoriesForm'

const initialState = {
  name: '',
  description: ''
}

export const CategoriesPage = () => {
  const { getCategories, createCategory, deleteCategory, categories } = useContext(CategoriesContext)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
  }, [])

  const onSubmit = (form) => createCategory(form)

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

        <CategoriesForm onSubmit={onSubmit} action='Create' initialState={initialState} />
      </main>
    </>
  )
}
