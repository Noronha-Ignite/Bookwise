import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
): Promise<NextResponse<{ books: BookWithRating[] }>> => {
  try {
    const { searchParams } = new URL(req.url)

    const category = searchParams.get('category') || undefined
    const query = searchParams.get('search') || ''

    const booksRaw = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
        ],
      },
      include: {
        ratings: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      distinct: ['id'],
    })

    const books: BookWithRatingAndCategories[] = booksRaw.map((book) => ({
      ...book,
      categories: book.categories.map(
        (categoryOnBook) => categoryOnBook.category,
      ),
    }))

    return NextResponse.json({
      books,
    })
  } catch (err) {
    console.log(err)

    return NextResponse.json({ books: [] })
  }
}
