import mongoose from 'mongoose'

const Category = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is a required field'], unique: true },
  description: { type: String, required: [true, 'Description is a required field'] }
})

const CategorySchema = mongoose.model('Category', Category)

export default CategorySchema
