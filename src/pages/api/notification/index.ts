import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'POST') {
    const {
      content,
      title,
      author_id,
      notification_type_id,
      object_url,
      recipients
    } = req.body
    const recipientArr: string[] = recipients?.toString().split(',')
    let data = await prisma.notifications.create({
      data: {
        notification_type_id: notification_type_id,
        object_url: object_url,
        author_id: author_id,
        content: content,
        title: title,
        create_at: new Date()
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot create notification',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    const recipient = recipientArr.map((item: string) => {
      return {
        notification_id: data.id,
        user_id: Number(item)
      }
    })
    await prisma.notifications_users.createMany({
      data: recipient
    })

    res.status(200).json({
      message: 'Successfully create notification',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}
