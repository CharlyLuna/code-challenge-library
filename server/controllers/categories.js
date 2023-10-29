import Category from '../models/category.js'
import Book from '../models/book.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.status(200).json({ data: categories })
  } catch (err) {
    res.status(500).json({ message: 'Error getting categories' })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const newCategory = await Category.create({ name, description })
    res.status(201).json({ message: 'Category added', data: newCategory })
  } catch (err) {
    res.status(500).json({ message: 'Error creating category: The name should be unique and values need to be valid' })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const { id } = req.params
    const data = await Category.findByIdAndUpdate(id, { name, description }, { new: true })
    res.status(200).json({ message: 'Category updated', data })
  } catch (err) {
    res.status(500).json({ message: 'Error updating category: The name should be unique and values need to be valid' })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const isUsed = await Book.findOne({ category: id })
    if (isUsed) throw new Error('Can not delete: Category is in use')
    const data = await Category.findByIdAndDelete(id)
    if (!data) throw new Error('Category not found')
    res.status(200).json({ message: 'Category deleted', data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
