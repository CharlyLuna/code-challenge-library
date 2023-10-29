export function formatDate (dateValue) {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatCategories = (categories) => {
  return categories.map(category => category.name).join(', ')
}

export const formatReadableDate = (date) => {
  const jsDate = new Date(date)
  return jsDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
