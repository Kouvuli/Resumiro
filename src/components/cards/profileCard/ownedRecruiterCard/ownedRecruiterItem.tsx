import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Recruiter } from '@shared/interfaces'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '@hooks/index'
import { deleteCompanyFromRecruiter } from '@redux/reducers/profileSlice'

const CustomOwnedRecruiterItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
interface OwnedRecruiterItemProps {
  data: Recruiter

  isModify: boolean
}

const OwnedRecruiterItem: React.FC<OwnedRecruiterItemProps> = ({
  data,

  isModify
}) => {
  const dispatch = useAppDispatch()

  const deleteRecruiterHandler = () => {
    dispatch(
      deleteCompanyFromRecruiter({
        id: data.id,
        data: {
          company_id: null
        }
      })
    )
  }

  return (
    <CustomOwnedRecruiterItem>
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
            {isModify && (
              <div>
                <IconButton>
                  <DeleteIcon onClick={deleteRecruiterHandler} />
                </IconButton>
              </div>
            )}
          </div>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
    </CustomOwnedRecruiterItem>
  )
}

export default OwnedRecruiterItem
