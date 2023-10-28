export const isValidName = (name) => {
  if (name.length < 3) return false
  const containsNumbers = /\d/.test(name)
  return !containsNumbers
}

export const isValidEmail = (email) => {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
}
