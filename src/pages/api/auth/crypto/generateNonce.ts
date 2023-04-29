import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

interface Data {
  nonce: string
  expires: string
}

// Generating a nonce is the first step of both registering and logging in.
//  In this function we generate a secure random string and assign it to
//  the public address that we get as a parameter.
// We save this to the database so if we don't have a user with the given
//  public address, we create a new user.
// Later steps of both logging in and registering require the user to sign
//  the nonce we send back, with that they prove that they are the owners
//  of the public address they gave.
export default async function generateNonce(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  const { address_wallet } = req.body
  prisma.$connect()
  if (req.method !== 'POST') return
  // Note: this nonce is displayed in the user's wallet for them to sign
  //  you can use any other representation of the nonce that you want
  //  but make sure to keep it a true random number with enough length.
  const nonce = crypto.randomBytes(32).toString('hex')

  // Set the expiry of the nonce to 1 hour
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60)
  // Create or update the nonce for the given user
  //  see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert

  let user

  user = await prisma.candidates.update({
    where: { address_wallet: address_wallet },
    data: {
      nonce: {
        upsert: {
          create: {
            nonce,
            expires
          },
          update: {
            nonce,
            expires
          }
        }
      }
    }
  })
  if (!user) {
    user = await prisma.recruiters.update({
      where: { address_wallet: address_wallet },
      data: {
        nonce: {
          upsert: {
            create: {
              nonce,
              expires
            },
            update: {
              nonce,
              expires
            }
          }
        }
      }
    })
  }
  return res.status(200).json({
    nonce,
    expires: expires.toISOString()
  })
}
