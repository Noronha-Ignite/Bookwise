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

      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',

      allowDangerousEmailAccountLinking: true,
      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          avatar_url: profile.avatar_url,
          email: profile.email ?? '',
          name: profile.name ?? '',
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
