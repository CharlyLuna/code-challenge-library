import User from '../models/user.js'

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
    const { name, email } = req.body
    const newUser = await User.create({ name, email })
    res.status(201).json({ message: 'User added', data: newUser })
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const { id } = req.params
    const data = await User.findByIdAndUpdate(id, { name, email }, { new: true })
    res.status(200).json({ message: 'User updated', data })
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const data = await User.findByIdAndDelete(id)
    if (!data) throw new Error('User not found')
    res.status(200).json({ message: 'User deleted', data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
