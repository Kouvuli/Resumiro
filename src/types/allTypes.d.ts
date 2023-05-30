import { DefaultSession, DefaultUser } from 'next-auth'
import { roles } from '@prisma/client'
declare module 'react-responsive-carousel'

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role?: roles
  walletAddress: string
  /**
   * Field to check whether a user has a subscription
   */
}

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
