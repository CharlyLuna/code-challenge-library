import { useContext, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../context/UsersContext'
import { UsersForm } from '../components/UsersForm'

export const EditUserPage = () => {
  const { getUserById, updateUser } = useContext(UsersContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useMemo(() => getUserById(id), [id])
  const initialState = {
    name: user?.name,
    email: user?.email
  }

  if (!user) return <Navigate to='/users' />

  const onSubmit = (formState) => updateUser(id, formState)

  return (
    <>
      <UsersForm initialState={initialState} onSubmit={onSubmit} navigate={() => navigate('/users')} action='Edit' />
    </>
  )
}
