type Book = {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: Date
}

type Rating = {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
}

type User = {
  id: string
  name: string
  avatar_url: string | null
  created_at: Date
}

type Category = {
  id: string
  name: string
}

type BookWithRating = {
  ratings: Rating[]
} & Book

type BookWithRatingAndCategories = {
  ratings: Rating[]
  categories: Category[]
} & Book

type RatingWithUser = {
  user: User
} & Rating

type RatingWithUserAndBook = {
  user: User
  book: Book
} & Rating
