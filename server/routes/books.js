import express from 'express'
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/books.js'
const router = express.Router()

router.get('/', getBooks)
router.post('/', createBook)
router.delete('/:id', deleteBook)
router.patch('/:id', updateBook)

export default router
