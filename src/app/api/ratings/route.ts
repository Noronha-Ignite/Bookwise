import { prisma } from '@/lib/prisma'
import console from 'console'
import { NextResponse } from 'next/server'
import * as z from 'zod'

const createRatingSchema = z.object({
  rate: z
    .number({ required_error: 'Campo "rate" é obrigatório' })
    .max(5, { message: 'Valor máximo: 5' })
    .min(0, { message: 'Valor mínimo: 0' }),

  description: z
    .string({ required_error: 'Campo "description" é obrigatório' })
    .min(15, { message: 'Descrição muito pequena (mínimo 15 caracteres)' })
    .max(450, { message: 'Descrição muito grande (máximo 450 caracteres)' }),
})

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
      orderBy: {
        created_at: 'desc',
      },
    })

    return NextResponse.json(ratings)
  } catch (err) {
    console.log(err)

    return NextResponse.json([])
  }
}

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)

    const bookId = searchParams.get('book')
    const userId = searchParams.get('user')

    const book = await prisma.book.findUnique({
      where: {
        id: bookId ?? '',
      },
    })

    if (!bookId || !book) {
      throw new Error('Livro não encontrado')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId ?? '',
      },
    })

    if (!userId || !user) {
      throw new Error('Usuário não encontrado')
    }

    const { rate, description } = createRatingSchema.parse(await req.json())

    const ratings = await prisma.rating.create({
      data: {
        description,
        rate,
        book_id: bookId,
        user_id: userId,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(ratings)
  } catch (err) {
    console.log(err)

    return NextResponse.json(err, { status: 500 })
  }
}
