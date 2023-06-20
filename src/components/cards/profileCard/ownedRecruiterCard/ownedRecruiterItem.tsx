import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Recruiter } from '@shared/interfaces'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { deleteCompanyFromRecruiter } from '@redux/reducers/profileSlice'
import { web3Selector } from '@redux/selectors'
import Image from 'next/image'

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
  const { resumiro } = useAppSelector(web3Selector)

  const deleteRecruiterHandler = async () => {
    await resumiro.disconnectCompanyRecruiter({
      recruiterAddress: data.address_wallet,
      companyId: data.company_id
    })
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
          <Image
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
                <IconButton onClick={deleteRecruiterHandler}>
                  <DeleteIcon />
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
