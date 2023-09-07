import dayjs from 'dayjs'

export const getDifferenceInDays = (date1: Date, date2: Date) => {
  const firstDate = dayjs(date1)
  const lastDate = dayjs(date2)

  const differenceInDays = Math.abs(firstDate.diff(lastDate, 'day'))

  return differenceInDays
}

export const formatDifferenceToToday = (date: Date) => {
  const difference = getDifferenceInDays(date, new Date())

  if (difference === 0) return 'hoje'

  if (difference === 1) return 'ontem'

  return dayjs(date).format('D [de] MMMM [de] YYYY')
}

export const formatHasPassedTime = (date: Date) => {
  const difference = getDifferenceInDays(date, new Date())

  let suffix = 'dias'
  let differenceFormatted = difference

  if (difference === 0) return 'Hoje'

  if (difference >= 30) {
    suffix = 'meses'
    differenceFormatted = Math.floor(difference / 30)
  }

  if (difference >= 365) {
    suffix = 'anos'
    differenceFormatted = Math.floor(difference / 365)
  }

  if (differenceFormatted === 1) {
    switch (suffix) {
      case 'dias':
        suffix = 'dia'
        break
      case 'meses':
        suffix = 'mês'
        break
      case 'anos':
        suffix = 'ano'
        break
    }
  }

  return `Há ${differenceFormatted} ${suffix}`
}
