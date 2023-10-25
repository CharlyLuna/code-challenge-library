import mongoose from 'mongoose'

const User = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is a required field'] },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is invalid']
  },
  hasBorrowed: { type: Boolean, default: false }
})

const UserSchema = mongoose.model('User', User)

export default UserSchema
