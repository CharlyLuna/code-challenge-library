import mongoose from 'mongoose'

export const connectDB = (url) => {
  mongoose.set('strictQuery', true)
  mongoose.connect(url).then(() => {
    console.log('connected to the database')
  })
    .catch((err) => console.log(err))
}
