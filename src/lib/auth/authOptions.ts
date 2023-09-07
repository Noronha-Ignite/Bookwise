import { AuthOptions, getServerSession } from 'next-auth'
import { prismaAdapter } from './prisma-adapter'

import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',

      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },

      async profile(profile: GoogleProfile) {
        const user = await prismaAdapter.getUserByEmail?.(profile.email)

        const data = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }

        if (!user) {
          return {
            ...data,
            created_at: new Date(),
          }
        }

        return {
          ...data,
          created_at: user.created_at,
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',

      allowDangerousEmailAccountLinking: true,

      async profile(profile: GithubProfile) {
        const user = await prismaAdapter.getUserByEmail?.(profile.email ?? '')

        const data = {
          id: String(profile.id),
          avatar_url: profile.avatar_url,
          email: profile.email ?? '',
          name: profile.name ?? '',
        }

        if (!user) {
          return {
            ...data,
            created_at: new Date(),
          }
        }

        return {
          ...data,
          created_at: user.created_at,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user = user

      return session
    },
  },

  adapter: prismaAdapter,
}

export const getSessionSSR = () => getServerSession(authOptions)
