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
