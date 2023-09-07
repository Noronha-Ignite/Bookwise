export const getFirstName = (name: string) => {
  const [firstName] = name.split(' ')

  return firstName
}

export const getSocialName = (name: string) => {
  const [firstName, lastName] = name.split(' ')

  if (!firstName) return ''

  if (!lastName) return firstName

  return `${firstName} ${lastName}`
}

export const capitalize = (text: string) => {
  return text.substring(0, 1).toUpperCase().concat(text.substring(1))
}
