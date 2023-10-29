import { useContext, useEffect } from 'react'
import { EditIcon } from '../components/icons/EditIcon'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { CategoriesContext } from '../context/CategoriesContext'
import { useNavigate } from 'react-router-dom'
import { CategoriesForm } from '../components/CategoriesForm'
import { usePagination } from '../hooks/usePagination'
import { Pagination } from '../components/Pagination'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'

const initialState = {
  name: '',
  description: ''
}

export const CategoriesPage = () => {
  const { getCategories, createCategory, deleteCategory, categories, error } = useContext(CategoriesContext)
  const navigate = useNavigate()
  const { ItemsToDisplay, currentPage, itemsPerPage, paginate, totalItems } = usePagination({ items: categories })

  useEffect(() => {
    getCategories()
  }, [])

  const onSubmit = (form) => createCategory(form)

  return (
    <main>
      <Table title='Categories' headings={['Name', 'Description', 'Actions']}>
        {
              ItemsToDisplay.map(category => (
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
      </Table>
      <Modal error={error} />
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate} totalItems={totalItems} />
      <CategoriesForm onSubmit={onSubmit} action='Create' initialState={initialState} />
    </main>
  )
}
