import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { deleteCandidateSkill } from '@redux/reducers/profileSlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useSession } from 'next-auth/react'
import ClearIcon from '@mui/icons-material/Clear'
import { web3Selector } from '@redux/selectors'
const CustomExperienceItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

interface SkillItemProps {
  id?: number

  name: string | null
  isModify: boolean
}

const SkillItem: React.FC<SkillItemProps> = ({ id, name, isModify }) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const deleteHandler = async () => {
    await resumiro.disconnectCandidateSkill(wallet.address, [id])
    dispatch(
      deleteCandidateSkill({
        id: session!.user!.id,
        data: { skill_id: id! }
      })
    )
  }
  return (
    <CustomExperienceItem>
      <CardHeader
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" color="text.primary" sx={{ my: 1 }}>
              {name}
            </Typography>
            {isModify && (
              <div>
                <IconButton onClick={deleteHandler} size="small">
                  <ClearIcon />
                </IconButton>
              </div>
            )}
          </div>
        }
        sx={{ padding: '0', alignItems: 'center' }}
      />
    </CustomExperienceItem>
  )
}

export default SkillItem
