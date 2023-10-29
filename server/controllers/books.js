import Book from '../models/book.js'
import User from '../models/user.js'
export const getBooks = async (req, res) => {
  try {
    const data = await Book.find({}).populate('category').populate('user')
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error getting books' })
  }
}

export const createBook = async (req, res) => {
  try {
    const { name, author, category, publicationDate, user } = req.body
    const data = await Book.create({ name, author, category, publicationDate, user })
    if (user) {
      await User.findOneAndUpdate({ _id: user }, { $push: { borrowedBooks: [data._id] } })
    }
    res.status(201).json({ message: 'Book added', data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating book: The name should be unique and values need to be valid' })
  }
}

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { user: oldUser } = await Book.findById(id)
    const { name, author, category, publicationDate, user } = req.body
    const data = await Book.findByIdAndUpdate(id, { name, author, category, publicationDate, user }, { new: true })

    if (oldUser) await User.findOneAndUpdate({ _id: oldUser._id }, { $pull: { borrowedBooks: id } })
    if (user) await User.findOneAndUpdate({ _id: user }, { $push: { borrowedBooks: [data._id] } })

    res.status(200).json({ message: 'Book updated', data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error updating book: The name should be unique and values need to be valid' })
  }
}

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = await Book.findById(id)
    if (user) throw new Error('Can not delete, book is borrowed')
    const data = await Book.findByIdAndDelete(id)
    if (!data) throw new Error('Book not found')
    res.status(200).json({ message: 'Book deleted', data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
