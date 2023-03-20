import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { motion, Variants } from 'framer-motion'
interface AboutMeCardProps {
  style?: React.CSSProperties
  about: string | null
}

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

const AboutMeCard: React.FC<AboutMeCardProps> = ({ style, about }) => {
  return (
    <motion.div
      style={style}
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card>
        <CardHeader
          title={
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontSize: '20px' }}
            >
              Về tôi
            </Typography>
          }
          action={
            <>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <CreateIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {about}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AboutMeCard
