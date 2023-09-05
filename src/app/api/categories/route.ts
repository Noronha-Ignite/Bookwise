import { prisma } from '@/lib/prisma'
import { Category } from '@prisma/client'
import console from 'console'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<
  NextResponse<{ categories: Category[] }>
> => {
  try {
    const categories = await prisma.category.findMany()

    return NextResponse.json({
      categories,
    })
  } catch (err) {
    console.log(err)

    return NextResponse.json({ categories: [] })
  }
}
