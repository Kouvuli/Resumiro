import React from 'react'
import { Card, CardHeader, Typography, Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getCurrentTimeDiff } from '@utils/timeUtil'
import CardContent from '@mui/material/CardContent'
import { users } from '@prisma/client'
interface NotificationCardProps {
  type: number
  author: users
  object_id: string
  content: string
  isRead: boolean
  createAt: Date
}

const CustomNotificationCard = styled(Card)(({}) => ({
  boxShadow: 'unset',

  '& .MuiPaper-root': {
    boxShadow: 'unset'
  }
}))

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  object_id,
  createAt,
  content,
  author,
  isRead
}) => {
  if (type !== 1) {
    return (
      <CustomNotificationCard
        sx={isRead ? { bgColor: 'unset' } : { bgcolor: 'primary.light' }}
      >
        <CardHeader
          sx={{
            alignItems: 'start'
          }}
          avatar={
            <img
              style={{ borderRadius: '5px' }}
              src={author.avatar ? author.avatar : '/images/default-user.jpg'}
              width={40}
              height={40}
              alt="avatar"
            />
          }
          title={
            <>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, textTransform: 'none' }}
              >
                <Link
                  sx={{ fontWeight: 700 }}
                  href={`/ung-vien/${author.id}`}
                  underline="hover"
                >
                  {author.full_name ? author.full_name : 'Có ứng viên mới'}
                </Link>{' '}
                {content}{' '}
                <Link
                  sx={{ fontWeight: 700 }}
                  href={`/viec-lam/${object_id}`}
                  underline="hover"
                >
                  công việc của bạn
                </Link>
              </Typography>
            </>
          }
          subheader={
            <Typography variant="body2" sx={{ flexGrow: 1, mt: 1 }}>
              {getCurrentTimeDiff(new Date(createAt))}
            </Typography>
          }
        />
      </CustomNotificationCard>
    )
  }

  return (
    <CustomNotificationCard
      sx={isRead ? { bgColor: 'unset' } : { bgcolor: 'primary.light' }}
    >
      <CardHeader
        sx={{
          alignItems: 'start'
        }}
        avatar={
          <img
            style={{ borderRadius: '5px' }}
            src={author.avatar ? author.avatar : '/images/default-user.jpg'}
            width={60}
            height={60}
            alt="avatar"
          />
        }
        title={
          <>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, textTransform: 'none' }}
            >
              <Link
                sx={{ fontWeight: 700 }}
                href={`/ung-vien/${author.id}`}
                underline="hover"
              >
                {author.full_name}
              </Link>{' '}
              {content}{' '}
              <Link
                sx={{ fontWeight: 700 }}
                href={`/viec-lam/${object_id}`}
                underline="hover"
              >
                {author.full_name}
              </Link>
            </Typography>
          </>
        }
        subheader={
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {getCurrentTimeDiff(new Date(createAt))}
          </Typography>
        }
      />
      <CardContent
        sx={{
          padding: '0 12px 12px 12px'
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          disableElevation
          disableRipple
        >
          Chấp nhận
        </Button>
        <Button variant="outlined" disableElevation disableRipple>
          Huỷ
        </Button>
      </CardContent>
    </CustomNotificationCard>
  )
}

export default NotificationCard
