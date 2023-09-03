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
