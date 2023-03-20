import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import LanguageIcon from '@mui/icons-material/Language'
import Link from 'next/link'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import { motion, Variants } from 'framer-motion'

interface CompanyBriefCardProps {
  id: number
  logo: string
  scale: string
  name: string
  website: string | null
  address: string | null
}

const CustomJobCard = styled(Card)(({ theme }) => ({
  borderRadius: '5px',
  width: '100%',
  boxShadow: 'unset',
  border: `1px solid ${theme.palette.text.disabled}`
}))

const variants: Variants = {
  initial: {
    opacity: 0,
    y: '20px'
  },
  visible: {
    opacity: 1,
    y: 0
  }
}
const CompanyBriefCard: React.FC<CompanyBriefCardProps> = ({
  id,
  logo,
  scale,
  name,
  website,
  address
}) => {
  return (
    <motion.div
      style={{ width: '100%' }}
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <CustomJobCard>
        <CardHeader
          sx={{
            padding: '24px',
            alignItems: 'start'
          }}
          avatar={
            <Link href={`/cong-ty/${id}`}>
              <Image
                style={{ borderRadius: '5px' }}
                src={logo}
                width={65}
                height={65}
                alt="avatar"
              />
            </Link>
          }
          title={
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {name}
            </Typography>
          }
          subheader={
            <div>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textTransform: 'capitalize',
                  mt: 1
                }}
              >
                {scale}
              </Typography>

              <IconButton sx={{ my: 1 }} href={website}>
                <LanguageIcon />
              </IconButton>
            </div>
          }
        />
        <CardContent
          sx={{
            padding: '0 24px 24px 24px'
          }}
        >
          <Typography variant="h5">Địa chỉ công ty</Typography>
          <Typography variant="body1" sx={{ my: 1.2 }}>
            {address}
          </Typography>
        </CardContent>
      </CustomJobCard>
    </motion.div>
  )
}

export default CompanyBriefCard
