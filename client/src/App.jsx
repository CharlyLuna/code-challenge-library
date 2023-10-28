import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/books' element={<h1>Page books</h1>} />
        <Route path='/books/:id' element={<h1>A book</h1>} />
        <Route path='/users' element={<h1>Page users</h1>} />
        <Route path='/users/:id' element={<h1>A user</h1>} />
        <Route path='/categories' element={<h1>Page categories</h1>} />
        <Route path='/categories/:id' element={<h1>A category</h1>} />
        <Route path='*' element={<Navigate to='/books' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
