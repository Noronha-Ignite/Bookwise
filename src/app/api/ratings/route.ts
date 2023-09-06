import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
): Promise<NextResponse<RatingWithUser[]>> => {
  try {
    const { searchParams } = new URL(req.url)

    const bookId = searchParams.get('book')

    const ratings = await prisma.rating.findMany({
      where: {
        book_id: bookId ?? undefined,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(ratings)
  } catch (err) {
    console.log(err)

    return NextResponse.json([])
  }
}
