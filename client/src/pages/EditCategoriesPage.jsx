import React, { useContext, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CategoriesContext } from '../context/CategoriesContext'
import { CategoriesForm } from '../components/CategoriesForm'

export const EditCategoriesPage = () => {
  const { getCategoryById, updateCategory } = useContext(CategoriesContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const category = useMemo(() => getCategoryById(id), [id])
  const initialState = {
    name: category?.name,
    description: category?.description
  }

  if (!category) return <Navigate to='/categories' />

  const onSubmit = (formState) => {
    updateCategory(id, formState)
  }

  return (
    <>
      <CategoriesForm initialState={initialState} onSubmit={onSubmit} navigate={() => navigate('/categories')} action='Edit' />
    </>
  )
}
