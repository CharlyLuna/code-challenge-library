import User from '../models/user.js'
import Book from '../models/book.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({ data: users })
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, hasBorrowed } = req.body
    const newUser = await User.create({ name, email, hasBorrowed })
    res.status(201).json({ message: 'User added', data: newUser })
  } catch (err) {
    res.status(500).json({ message: 'Error creating user: The email should be unique and values need to be valid' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const { id } = req.params
    const data = await User.findByIdAndUpdate(id, { name, email }, { new: true })
    res.status(200).json({ message: 'User updated', data })
  } catch (err) {
    res.status(500).json({ message: 'Error updating user: The email should be unique and values need to be valid' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const hasBorrowed = await Book.findOne({ user: id })
    if (hasBorrowed) throw new Error('Can not delete: user has borrowed a book')
    const data = await User.findByIdAndDelete(id)
    if (!data) throw new Error('User not found')
    res.status(200).json({ message: 'User deleted', data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
