import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider
} from '@mui/material'
import styles from './companyDetailCardStyle.module.css'
import Image from 'next/image'
import Link from 'next/link'
import RoundButton from '@components/ui/button/roundButton'
import { locations } from '@prisma/client'
import { useRouter } from 'next/router'
interface CompanyDetailCardProps {
  companyName: string
  location: locations
  website: string
  about: string | null
  scale: string
  logo: string
}

const CompanyDetailCard: React.FC<CompanyDetailCardProps> = ({
  companyName,
  location,
  website,
  about,
  scale,
  logo
}) => {
  const router = useRouter()
  return (
    <Card sx={{ borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }}>
      <CardHeader
        sx={{
          alignItems: 'start',
          padding: '24px'
        }}
        avatar={
          <Image
            style={{ borderRadius: '5px' }}
            src={logo}
            width={180}
            height={180}
            alt="avatar"
          />
        }
        title={
          <Typography
            variant="h3"
            sx={{
              textTransform: 'capitalize',
              mb: 2,
              color: 'primary.main'
            }}
          >
            {companyName}
          </Typography>
        }
        subheader={
          <>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.3rem',
                color: 'text.primary',
                textTransform: 'none',
                mb: 2
              }}
            >
              {about}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <dl className={styles['description']}>
                <dt>Địa điểm</dt>
                <dd>{location.name}</dd>
                {website && (
                  <>
                    <dt>Website</dt>
                    <dd>
                      <Link
                        rel="nofollow noopener noreferrer"
                        href={website}
                        target="_blank"
                      >
                        {website}
                      </Link>
                    </dd>
                  </>
                )}
                <dt>Quy mô công ty</dt>
                <dd>{scale}</dd>
              </dl>
            </div>
          </>
        }
      ></CardHeader>
      <CardContent sx={{ p: '0 24px 24px 24px' }}>
        <Divider sx={{ mb: 2 }} />

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <RoundButton
            style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.25)' }}
            onClick={() => {
              router.push(`/cong-ty/${router.query.id}/viec-lam`)
            }}
          >
            Xem việc làm đang tuyển
          </RoundButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyDetailCard
