import mongoose from 'mongoose'

const Book = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is a required field'], unique: true },
  author: { type: String, required: [true, 'Author is a required field'] },
  category: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    required: [true, 'Category is a required field']
  },
  publicationDate: { type: Date, required: [true, 'Publication date is a required field'] },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: null }
})

const BookSchema = mongoose.model('Book', Book)

export default BookSchema
