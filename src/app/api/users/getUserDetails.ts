import { prisma } from '@/lib/prisma'

type CountedCategory = { category: string; count: number; totalPages: number }

export const getUserDetails = async (userId: string): Promise<UserDetails> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const booksRatedByUserAmount = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    select: {
      book: {
        select: {
          total_pages: true,
          author: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    distinct: ['book_id'],
  })

  const countedCategories = booksRatedByUserAmount.reduce<CountedCategory[]>(
    (acc, { book }) => {
      const countedCategoriesAcc = [...acc]

      const bookCategories = book.categories.map(
        ({ category }) => category.name,
      )

      bookCategories.forEach((category) => {
        const categoryIndexInAccumulator = countedCategoriesAcc.findIndex(
          (countedCategory) => countedCategory.category === category,
        )

        if (categoryIndexInAccumulator === -1) {
          return countedCategoriesAcc.push({
            category,
            count: 1,
            totalPages: book.total_pages,
          })
        }

        countedCategoriesAcc[categoryIndexInAccumulator].count++
        countedCategoriesAcc[categoryIndexInAccumulator].totalPages +=
          book.total_pages
      })

      return countedCategoriesAcc
    },
    [] as CountedCategory[],
  )

  const mostReadCategory = countedCategories.reduce<CountedCategory>(
    (currentMostRead, countedCategory) => {
      if (
        currentMostRead.count < countedCategory.count ||
        (currentMostRead.count === countedCategory.count &&
          currentMostRead.totalPages < countedCategory.totalPages)
      )
        return countedCategory

      return currentMostRead
    },
    { category: '', count: 0, totalPages: 0 },
  ).category

  const totalData = booksRatedByUserAmount.reduce(
    (acc, { book }) => {
      const totalRatedBooks = acc.totalRatedBooks + 1
      const totalReadPages = acc.totalReadPages + book.total_pages
      const authorsRead = [...new Set([...acc.authorsRead, book.author])]

      return {
        totalRatedBooks,
        totalReadPages,
        authorsRead,
      }
    },
    {
      totalReadPages: 0,
      totalRatedBooks: 0,
      authorsRead: [...new Set<string>([])],
    },
  )

  return {
    totalRatedBooks: totalData.totalRatedBooks,
    totalReadPages: totalData.totalReadPages,
    totalAuthorsRead: totalData.authorsRead.length,
    mostReadCategory,
  }
}
