import { Rating } from '@prisma/client'

export const getRatingAverage = (ratings: Rating[]) => {
  const rateSum = ratings.reduce((rateSum, rating) => {
    return rateSum + rating.rate
  }, 0)

  return Math.floor(rateSum / ratings.length)
}
