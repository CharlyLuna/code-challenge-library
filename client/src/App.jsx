import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UsersProvider } from './context/UsersContext'
import { UsersPage } from './pages/UsersPage'
import { NavBar } from './components/NavBar'
import { EditUserPage } from './pages/EditUserPage'
import { CategoriesProvider } from './context/CategoriesContext'
import { CategoriesPage } from './pages/CategoriesPage'
import { EditCategoriesPage } from './pages/EditCategoriesPage'
import { BooksPage } from './pages/BooksPage'
import { BooksProvider } from './context/BooksContext'
import { EditBooksPage } from './pages/EditBooksPage'

function App () {
  return (
    <UsersProvider>
      <CategoriesProvider>
        <BooksProvider>
          <BrowserRouter>
            <main>
              <NavBar />
              <Routes>
                <Route path='/books' element={<BooksPage />} />
                <Route path='/books/:id' element={<EditBooksPage />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/users/:id' element={<EditUserPage />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route path='/categories/:id' element={<EditCategoriesPage />} />
                <Route path='*' element={<Navigate to='/books' />} />
              </Routes>
            </main>
          </BrowserRouter>
        </BooksProvider>
      </CategoriesProvider>
    </UsersProvider>
  )
}

export default App
