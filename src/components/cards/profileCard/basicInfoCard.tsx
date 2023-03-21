import {
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Avatar
} from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create'
import CircleIcon from '@mui/icons-material/Circle'
import OvalButton from '@components/ui/button/ovalButton'

interface BasicInfoCardProps {
  username: string
  fullName?: string | null
  avatar: string | null
  role: string
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  username,
  avatar,
  fullName,
  role
}) => {
  return (
    <Card
      sx={{
        borderTopRightRadius: '0px',
        borderTopLeftRadius: '0px',
        overflow: 'visible'
      }}
    >
      <CardHeader
        avatar={
          <div style={{ position: 'relative', width: '170px' }}>
            {avatar && (
              <Avatar
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '170px',
                  width: '170px'
                }}
                alt={fullName}
                src={avatar}
              />
            )}
          </div>
        }
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                fontSize: '20px',
                textTransform: 'capitalize'
              }}
            >
              {fullName}
            </Typography>
            <CircleIcon sx={{ fontSize: '8px', mx: 1 }} />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ color: 'info.main' }}
            >
              @{username}
            </Typography>
          </div>
        }
        action={
          <IconButton>
            <CreateIcon />
          </IconButton>
        }
        subheader={
          <>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold', mt: 1.5, textTransform: 'capitalize' }}
              color="text.primary"
            >
              {role}
            </Typography>
          </>
        }
        sx={{ alignItems: 'end' }}
      />
      {role === 'recruiter' && (
        <CardContent sx={{ py: 'unset' }}>
          <OvalButton style={{ marginRight: '8px' }} primary>
            Theo dõi
          </OvalButton>
          <OvalButton primary outlined>
            Việc làm đã tạo
          </OvalButton>
        </CardContent>
      )}
      {role === 'candidate' && (
        <CardContent sx={{ py: 'unset' }}>
          <OvalButton style={{ marginRight: '8px' }} primary>
            Theo dõi
          </OvalButton>
          <OvalButton>Hồ sơ chính</OvalButton>
        </CardContent>
      )}
    </Card>
  )
}

export default BasicInfoCard
