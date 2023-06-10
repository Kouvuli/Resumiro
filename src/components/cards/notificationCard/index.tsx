import React from 'react'
import { Card, CardHeader, Typography, Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getCurrentTimeDiff } from '@utils/timeUtil'
import CardContent from '@mui/material/CardContent'
import { users } from '@prisma/client'
import { useAppDispatch } from '@hooks/index'
import {
  updateRecruiterCompany,
  allowRecruiterToView,
  deleteNotificationById
} from '@redux/reducers/headerSlice'
import { useSession } from 'next-auth/react'
interface NotificationCardProps {
  id: number
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
  id,
  type,
  object_id,
  createAt,
  content,
  author,
  isRead
}) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const acceptRecruiterToCompanyHandler = () => {
    dispatch(
      updateRecruiterCompany({
        data: {
          company_id: Number(object_id)
        },
        userId: author.id,
        authorId: Number(session!.user!.id),
        title: 'Chấp nhận',
        content: 'chấp nhận bạn vào công ty'
      })
    )

    dispatch(deleteNotificationById(id))
    // dispatch(headerSlice.actions.refreshNotification(!refreshNotification))
  }
  const rejectRecruiterToCompanyHandler = () => {
    dispatch(deleteNotificationById(id))
    // dispatch(headerSlice.actions.refreshNotification(!refreshNotification))
  }

  const acceptRecruiterToViewResumeHandler = () => {
    dispatch(
      allowRecruiterToView({
        resumeId: Number(object_id),
        userId: author.id,
        authorId: Number(session!.user!.id),
        title: 'Chấp nhận',
        content: 'chấp nhận bạn xem CV của họ'
      })
    )

    dispatch(deleteNotificationById(id))
  }

  const rejectRecruiterToViewResumeHandler = () => {
    dispatch(deleteNotificationById(id))
  }
  if (type === 3) {
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
  if (type === 4) {
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
                  {author.full_name ? author.full_name : author.username}
                </Link>{' '}
                {content}{' '}
                <Link
                  sx={{ fontWeight: 700 }}
                  href={`${object_id}`}
                  underline="hover"
                >
                  file tại đây
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

  if (type === 2) {
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
                  href={`/nha-tuyen-dung/${author.id}`}
                  underline="hover"
                >
                  {author.full_name ? author.full_name : author.username}
                </Link>{' '}
                {content}{' '}
                <Link
                  sx={{ fontWeight: 700 }}
                  href={`/cong-ty/${object_id}`}
                  underline="hover"
                >
                  công ty
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
            sx={{ mr: 1, textTransform: 'none' }}
            disableElevation
            onClick={acceptRecruiterToCompanyHandler}
            disableRipple
          >
            Chấp nhận
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={rejectRecruiterToCompanyHandler}
            variant="outlined"
            disableElevation
            disableRipple
          >
            Huỷ
          </Button>
        </CardContent>
      </CustomNotificationCard>
    )
  }

  if (type === 5) {
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
                  href={`/nha-tuyen-dung/${author.id}`}
                  underline="hover"
                >
                  {author.full_name ? author.full_name : author.username}
                </Link>{' '}
                {content}
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
            sx={{ mr: 1, textTransform: 'none' }}
            disableElevation
            onClick={acceptRecruiterToViewResumeHandler}
            disableRipple
          >
            Chấp nhận
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={rejectRecruiterToViewResumeHandler}
            variant="outlined"
            disableElevation
            disableRipple
          >
            Huỷ
          </Button>
        </CardContent>
      </CustomNotificationCard>
    )
  }

  if (type === 6) {
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
                  {author.full_name ? author.full_name : author.username}
                </Link>{' '}
                {content}
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
