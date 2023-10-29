import { useState } from 'react'

export const usePagination = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const indexLastItem = currentPage * itemsPerPage
  const indexFirstItem = indexLastItem - itemsPerPage
  const ItemsToDisplay = items.slice(indexFirstItem, indexLastItem)

  return {
    currentPage,
    itemsPerPage,
    paginate,
    ItemsToDisplay,
    totalItems: items?.length
  }
}
