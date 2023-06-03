import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Recruiter } from '@shared/interfaces'
import { IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import { useAppDispatch } from '@hooks/index'
import profileSlice, {
  updateRecruiterCompany
} from '@redux/reducers/profileSlice'
const CustomNonCompanyItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
interface NonCompanyItemProps {
  data: Recruiter

  companyId: number
}

const NonCompanyRecruiterItem: React.FC<NonCompanyItemProps> = ({
  data,

  companyId
}) => {
  const dispatch = useAppDispatch()

  const addRecruiterToCompanyHandler = () => {
    dispatch(
      updateRecruiterCompany({
        id: data.id,
        data: {
          company_id: companyId
        }
      })
    )
    dispatch(profileSlice.actions.clearNonCompanyRecruiters())
  }

  return (
    <CustomNonCompanyItem>
      <CardHeader
        avatar={
          <img
            style={{ borderRadius: '5px' }}
            src={data.avatar || '/images/default-user.jpg'}
            width={80}
            height={80}
            alt="avatar"
          />
        }
        title={
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {data.full_name}
          </Typography>
        }
        subheader={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.position}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            <IconButton onClick={addRecruiterToCompanyHandler}>
              <AddIcon />
            </IconButton>
          </div>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
    </CustomNonCompanyItem>
  )
}

export default NonCompanyRecruiterItem
