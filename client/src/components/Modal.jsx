import { useEffect, useState } from 'react'
import './Modal.scss'

export const Modal = ({ error }) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    error ? setShowModal(true) : setShowModal(false)
  }, [error])

  console.log(showModal)

  return (
    <div className={`modal ${showModal ? 'visible' : 'invisible'}`}>
      <p>{error}</p>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  )
}
