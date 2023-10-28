import { createContext } from 'react'
import { useCategoriesState } from '../hooks/useCategoriesState'

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const { categories, createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, error } = useCategoriesState()
  return (
    <CategoriesContext.Provider value={{ categories, createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, error }}>
      {children}
    </CategoriesContext.Provider>
  )
}
