import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UsersProvider } from './context/UsersContext'
import { UsersPage } from './pages/UsersPage'
import { NavBar } from './components/NavBar'
import { EditUserPage } from './pages/EditUserPage'
import { CategoriesProvider } from './context/CategoriesContext'
import { CategoriesPage } from './pages/CategoriesPage'
import { EditCategoriesPage } from './pages/EditCategoriesPage'

function App () {
  return (
    <UsersProvider>
      <CategoriesProvider>
        <BrowserRouter>
          <main>
            <NavBar />
            <Routes>
              <Route path='/books' element={<h1>Page books</h1>} />
              <Route path='/books/:id' element={<h1>A book</h1>} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/users/:id' element={<EditUserPage />} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/categories/:id' element={<EditCategoriesPage />} />
              <Route path='*' element={<Navigate to='/books' />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CategoriesProvider>
    </UsersProvider>
  )
}

export default App
