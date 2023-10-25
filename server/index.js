import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/mongodb.js'
import categoryRoutes from './routes/categories.js'
import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

dotenv.config()
const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use('/library/categories', categoryRoutes)
app.use('/library/books', bookRoutes)
app.use('/library/users', userRoutes)

app.get('/library', async (req, res) => {
  res.send('Hello from library API')
})

const startServer = async () => {
  try {
    connectDB(process.env.URI)
    app.listen(3001, () => {
      console.log('server is up on port 3001')
    })
  } catch (err) {
    console.log(err)
  }
}

startServer()
