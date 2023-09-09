import { prisma } from '@/lib/prisma'
import console from 'console'
import { NextRequest, NextResponse } from 'next/server'
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
  req: NextRequest,
): Promise<NextResponse<RatingWithUserAndBook[]>> => {
  try {
    const searchParams = req.nextUrl.searchParams

    const bookId = searchParams.get('book') || undefined
    const userId = searchParams.get('user') || undefined
    const query = searchParams.get('query') || ''

    const ratings = await prisma.rating.findMany({
      where: {
        OR: [{ book_id: bookId }, { user_id: userId }],
        book: {
          name: {
            contains: query,
          },
        },
      },
      include: {
        user: true,
        book: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    })

    return NextResponse.json(ratings)
  } catch (err) {
    console.log(err)

    return NextResponse.json([])
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams

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
    if (err instanceof z.ZodError) {
      const message = err.issues[0].message

      return NextResponse.json({ message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Erro desconhecido.' }, { status: 500 })
  }
}
