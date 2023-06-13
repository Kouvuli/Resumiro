import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { Field } from '@shared/interfaces'

const fieldCardVariants: Variants = {
  initial: {
    boxShadow: '0px 1px 5px 0px rgba(25,55,100,0.25)',
    opacity: 0,
    y: '20px'
  },

  visible: {
    opacity: 1,
    y: 0
  },

  hover: {
    boxShadow: '-5px 10px 25px 0px rgba(25,55,100,0.15)',
    transition: {
      duration: 0.2
    }
  }
}

const CustomFieldCard = styled(Card)(({}) => ({
  // boxShadow: '-5px 10px 25px 0px rgba(25,55,100,0.25)',
  minWidth: 275,
  width: '100%',
  borderRadius: '3%',
  '& .MuiPaper-root': {
    boxShadow: 'unset'
  }
}))

const CustomJobText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontSize: '1rem',
  fontWeight: 600,
  marginLeft: '15px',
  '&:before': {
    content: '""',
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    left: '-15px',
    top: '3px',
    width: '9px',
    height: '9px',
    boxSizing: 'border-box',
    // padding: '6px',
    borderRadius: '50%'
  }
}))

const FieldCard: React.FC<Field> = ({
  fieldTitle,
  description,
  vacantNumber
}) => {
  return (
    <motion.div
      variants={fieldCardVariants}
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <CustomFieldCard>
        <CardContent
          sx={{
            // '&:last-child': { paddingBottom: 'unset' },
            p: '24px'
          }}
        >
          <Typography sx={{ mb: '1rem' }} color="primary.main" variant="h5">
            {fieldTitle}
          </Typography>
          <Typography
            sx={{ mb: '0.8rem' }}
            color="text.secondary"
            variant="body1"
          >
            {description}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center'
            }}
          >
            <CustomJobText variant="body1" color="primary.main">
              Việc làm đang tuyển:
            </CustomJobText>
            <Typography
              sx={{
                ml: '5px',
                fontWeight: 700,
                fontSize: '1rem'
              }}
              color="text.primary"
            >
              {vacantNumber}
            </Typography>
          </div>
        </CardContent>
      </CustomFieldCard>
    </motion.div>
  )
}

export default FieldCard
