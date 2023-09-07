import 'next-auth'

declare module 'next-auth' {
  type User = {
    id: string
    name: string
    email: string
    avatar_url: string | null
    created_at: Date
  }

  type Session = {
    user: User
  }
}
