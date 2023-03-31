import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import OwnedJobItem from './ownedJobItem'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { Job, Skill } from '@shared/interfaces'
import { fields, locations } from '@prisma/client'
interface OwnedJobCardProps {
  style?: React.CSSProperties
  allSkills: Skill[]
  allFields: fields[]
  allLocations: locations[]
  jobs?: Job[]
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

const CustomListItem = styled(ListItem)(({}) => ({
  paddingLeft: 'unset',
  paddingRight: 'unset'
}))

const OwnedJobCard: React.FC<OwnedJobCardProps> = ({
  style,
  jobs,
  allSkills,
  allFields,
  allLocations
}) => {
  const [isModify, setIsModify] = useState(false)

  const modifyToggleHandler = () => {
    setIsModify(prev => !prev)
  }

  return (
    <motion.div
      style={style}
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontSize: '20px' }}
            >
              Việc làm đã tạo
            </Typography>
          }
          action={
            <>
              <IconButton onClick={modifyToggleHandler}>
                <CreateIcon />
              </IconButton>
            </>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ py: 'unset' }}>
          <List disablePadding>
            {jobs!.map((item, index) => (
              <CustomListItem key={index}>
                <OwnedJobItem
                  data={item}
                  isModify={isModify}
                  allFields={allFields}
                  allLocations={allLocations}
                  allSkills={allSkills}
                />
              </CustomListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default OwnedJobCard
