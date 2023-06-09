import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import JobCard, { JobCardProps } from '@components/cards/jobCard'
import { styled } from '@mui/material/styles'
import RoundButton from '@components/ui/button/roundButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Typography from '@mui/material/Typography'
interface SuitableJobProps {
  openHandler?: () => void
  isResumePage?: boolean
  title: string
  items: JobCardProps[]
}

const CustomListItem = styled(ListItem)(({ theme }) => ({
  padding: `0 0 ${theme.spacing(2)} ${theme.spacing(4)}`,
  [theme.breakpoints.down('md')]: {
    padding: `0 0 ${theme.spacing(2)} 0`
  },
  // justifyContent: 'flex-end',
  width: '100%'
}))

const SuitableJob: React.FC<SuitableJobProps> = ({
  openHandler,
  isResumePage,
  title,
  items
}) => {
  return (
    <List disablePadding>
      {isResumePage && (
        <CustomListItem>
          <RoundButton
            onClick={openHandler}
            primary={true}
            startIcon={<FileUploadIcon />}
            style={{ fontSize: '1rem', padding: '10px 12px' }}
          >
            Tải CV lên
          </RoundButton>
        </CustomListItem>
      )}
      {
        <CustomListItem>
          <Typography variant="h5" sx={{ mt: 1, fontSize: '1.4rem' }}>
            {title}
          </Typography>
        </CustomListItem>
      }
      {items.map((item, index) => (
        <CustomListItem key={index}>
          <JobCard type={2} {...item} />
        </CustomListItem>
      ))}
    </List>
  )
}

export default SuitableJob
