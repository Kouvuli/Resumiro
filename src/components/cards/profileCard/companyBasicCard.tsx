import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import React from 'react'
import { companies } from '@prisma/client'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'
interface CompanyBasicCardProps {
  style?: React.CSSProperties
  company: companies
}

const CustomCard = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

const CompanyBasicCard: React.FC<CompanyBasicCardProps> = ({
  style,
  company
}) => {
  return (
    <Card sx={style}>
      <CardHeader
        title={
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontSize: '20px' }}
          >
            Công ty
          </Typography>
        }
      />
      <CardContent>
        <CustomCard>
          <CardHeader
            avatar={
              <Image
                width={70}
                height={70}
                alt={company.name}
                src={company.logo ? company.logo : '/images/Images_1.png'}
              />
            }
            title={
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ mb: 1, fontSize: '1.2rem' }}
              >
                {company.name}
              </Typography>
            }
            subheader={
              <>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mb: 1.4 }}
                >
                  {company.introduction}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.4 }}
                >
                  {company.scale}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.4 }}
                >
                  {company.address}
                </Typography>
              </>
            }
          ></CardHeader>
        </CustomCard>
      </CardContent>
    </Card>
  )
}

export default CompanyBasicCard
