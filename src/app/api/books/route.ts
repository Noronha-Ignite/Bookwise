import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams

    const categoriesStringified = searchParams.get('categories') || '[]'
    const query = searchParams.get('search') || ''

    const categories: string[] = JSON.parse(categoriesStringified)

    const booksRaw = await prisma.book.findMany({
      where: {
        categories: categories.length
          ? {
              some: {
                category: {
                  name: {
                    in: categories,
                  },
                },
              },
            }
          : undefined,
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

    return NextResponse.json(
      {
        error: true,
        message: 'Internal Server Error',
        err,
      },
      {
        status: 500,
      },
    )
  }
}
