import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled, SxProps } from '@mui/material/styles'
import TagButton from '@components/ui/button/tagButton'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CardHeader from '@mui/material/CardHeader'
import RoundButton from '@components/ui/button/roundButton'
import CardActions from '@mui/material/CardActions'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ShareIcon from '@mui/icons-material/Share'
import Image from 'next/image'
import { convertMonthToYear, getCurrentTimeDiff } from '@utils/timeUtil'
import { locations } from '@prisma/client'
import { useSession } from 'next-auth/react'
interface JobDetailCardProps {
  isApply: boolean
  applyHandler: () => void
  id: number
  jobTitle: string
  companyName: string
  companyLogo: string
  location: locations
  salary: number
  experience: number
  job_type: string

  createAt: Date
  updateAt: Date | null
}

const activeStyle: SxProps = {
  background: 'white',
  border: 1,
  borderColor: 'primary.main',
  '&:hover': {
    background: 'white'
  },
  color: 'primary.main',

  padding: 1.5,
  fontSize: '1.1rem'
}
const normalStyle: SxProps = {
  padding: 1.5,
  fontSize: '1.1rem'
}
const CustomJobCard = styled(Card)(({ theme }) => ({
  borderRadius: '0',
  boxShadow: 'unset',

  borderBottom: `1px solid ${theme.palette.text.disabled}`
}))

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  isApply,
  applyHandler,
  jobTitle,
  companyName,
  companyLogo,
  location,
  salary,
  experience,
  job_type,
  createAt,
  updateAt
}) => {
  const { data: session } = useSession()
  return (
    <CustomJobCard>
      <CardHeader
        sx={{ alignItems: 'start', padding: '24px 24px 12px 0' }}
        avatar={
          <Image
            style={{ borderRadius: '5px' }}
            src={companyLogo}
            width={70}
            height={70}
            alt="avatar"
          />
        }
        title={
          <Typography variant="h4" sx={{ textTransform: 'uppercase', mb: 1 }}>
            {jobTitle}
          </Typography>
        }
        subheader={
          <Typography variant="h6" color="info.main">
            {companyName}
          </Typography>
        }
      />
      <CardContent
        sx={{
          padding: '0 24px 0 0'
        }}
      >
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <TagButton size="large" primary icon={<MonetizationOnIcon />}>
              {salary} VND/ tháng
            </TagButton>
          </li>
          <li>
            <TagButton size="large" primary icon={<LocationOnIcon />}>
              {location.name}
            </TagButton>
          </li>
          <li>
            <TagButton size="large" primary icon={<LocationOnIcon />}>
              {job_type}
            </TagButton>
          </li>
          <li>
            <TagButton size="large" primary icon={<WorkIcon />}>
              {convertMonthToYear(experience)}
            </TagButton>
          </li>
          <li
            style={{
              paddingTop: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Đăng trong {getCurrentTimeDiff(new Date(createAt))} trước
            </Typography>
            {updateAt && (
              <>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: '0.6rem',
                    mx: 0.5,
                    color: 'primary.main'
                  }}
                />
                <Typography variant="body1" color="info.main">
                  Cập nhật {getCurrentTimeDiff(new Date(updateAt))} trước
                </Typography>
              </>
            )}
          </li>
        </ul>
      </CardContent>
      {session && session.user!.role === 'candidate' && (
        <CardActions sx={{ padding: '24px 24px 24px 0' }}>
          <RoundButton
            primary
            style={isApply ? activeStyle : normalStyle}
            onClick={applyHandler}
          >
            Ứng tuyển nhanh
          </RoundButton>
          <RoundButton
            style={{ padding: '12px', fontSize: '1.1rem' }}
            startIcon={<FavoriteBorderOutlinedIcon />}
          >
            Thích
          </RoundButton>
          <RoundButton
            style={{ padding: '12px', fontSize: '1.1rem' }}
            startIcon={<ShareIcon />}
          >
            Chia sẻ
          </RoundButton>
        </CardActions>
      )}
    </CustomJobCard>
  )
}

export default JobDetailCard
