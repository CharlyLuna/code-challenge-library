import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UsersProvider } from './context/UsersContext'
import { UsersPage } from './pages/UsersPage'
import { NavBar } from './components/NavBar'
import { EditUserPage } from './pages/EditUserPage'

function App () {
  return (
    <UsersProvider>
      <BrowserRouter>
        <main>
          <NavBar />
          <Routes>
            <Route path='/books' element={<h1>Page books</h1>} />
            <Route path='/books/:id' element={<h1>A book</h1>} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/users/:id' element={<EditUserPage />} />
            <Route path='/categories' element={<h1>Page categories</h1>} />
            <Route path='/categories/:id' element={<h1>A category</h1>} />
            <Route path='*' element={<Navigate to='/books' />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UsersProvider>
  )
}

export default App
