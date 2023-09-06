import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export const prismaAdapter: Adapter = {
  async createUser(user) {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name ?? '',
        avatar_url: user.avatar_url,
        email: user.email,
      },
    })

    return {
      email: createdUser.email,
      emailVerified: null,
      id: createdUser.id,
      name: createdUser.name,
      avatar_url: createdUser.avatar_url,
    }
  },

  async getUser(id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      emailVerified: null,
    }
  },

  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      emailVerified: null,
    }
  },

  async getUserByAccount({ providerAccountId, provider }) {
    const data = await prisma.account.findUnique({
      select: {
        user: true,
      },
      where: {
        provider_provider_account_id: {
          provider_account_id: providerAccountId,
          provider,
        },
      },
    })

    if (!data) {
      return null
    }

    const { user } = data

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      emailVerified: null,
    }
  },

  async updateUser(user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      },
    })

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar_url: updatedUser.avatar_url,
      emailVerified: null,
    }
  },

  async deleteUser(userId) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  },

  async linkAccount(account) {
    await prisma.account.create({
      data: {
        user_id: account.userId,
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      },
    })
  },

  async unlinkAccount({ providerAccountId, provider }) {
    await prisma.account.delete({
      where: {
        provider_provider_account_id: {
          provider,
          provider_account_id: providerAccountId,
        },
      },
    })
  },

  async createSession({ sessionToken, userId, expires }) {
    await prisma.session.create({
      data: {
        user_id: userId,
        session_token: sessionToken,
        expires,
      },
    })

    return {
      sessionToken,
      userId,
      expires,
    }
  },

  async getSessionAndUser(sessionToken) {
    const session = await prisma.session.findUnique({
      where: {
        session_token: sessionToken,
      },
      include: {
        user: true,
      },
    })

    if (!session) {
      return null
    }

    const { user } = session

    return {
      session: {
        userId: session.user_id,
        expires: session.expires,
        sessionToken: session.session_token,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        emailVerified: null,
      },
    }
  },

  async updateSession({ sessionToken, userId, expires }) {
    const session = await prisma.session.update({
      where: {
        session_token: sessionToken,
      },
      data: {
        user_id: userId,
        expires,
      },
    })

    return {
      expires: session.expires,
      userId: session.user_id,
      sessionToken: session.session_token,
    }
  },

  async deleteSession(sessionToken) {
    await prisma.session.delete({
      where: {
        session_token: sessionToken,
      },
    })
  },
}
