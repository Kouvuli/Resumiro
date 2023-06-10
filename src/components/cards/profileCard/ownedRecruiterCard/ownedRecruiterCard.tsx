import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import OwnedRecruiterItem from './ownedRecruiterItem'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { Recruiter } from '@shared/interfaces'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import profileSlice, {
  fetchNonCompanyRecruiters
} from '@redux/reducers/profileSlice'
import { profileSelector } from '@redux/selectors'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import SearchTextField from '@components/ui/textfield/searchTextField'
import _ from 'lodash'
import Grid from '@mui/material/Grid'
import NonCompanyRecruiterItem from './nonCompanyRecruiterItem'
import { Paper } from '@mui/material'
interface OwnedRecruiterCardProps {
  style?: React.CSSProperties
  companyId: number
  recruiters?: Recruiter[]
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

const OwnedRecruiterCard: React.FC<OwnedRecruiterCardProps> = ({
  style,
  recruiters,
  companyId
}) => {
  const [addModalOpen, setAddModalOpen] = useState(false)

  const { loading, searchRecruiterNonCompanyText, recruitersNonCompany } =
    useAppSelector(profileSelector)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (searchRecruiterNonCompanyText === '') return
    dispatch(
      fetchNonCompanyRecruiters({
        q: searchRecruiterNonCompanyText,
        page: 1
      })
    )
  }, [searchRecruiterNonCompanyText])

  const openAddRecruiterHandler = () => setAddModalOpen(true)
  const closeAddRecruiterHandler = () => setAddModalOpen(false)

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(
      profileSlice.actions.changeSearchRecruiterNonCompanyText(e.target.value)
    )
  }
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
              Những nhà tuyển dụng
            </Typography>
          }
          action={
            <>
              <IconButton onClick={openAddRecruiterHandler}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={modifyToggleHandler}>
                <CreateIcon />
              </IconButton>
            </>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ py: 'unset' }}>
          <List disablePadding>
            {recruiters!.map((item, index) => (
              <CustomListItem key={index}>
                <OwnedRecruiterItem data={item} isModify={isModify} />
              </CustomListItem>
            ))}
          </List>
          <Modal open={addModalOpen} onClose={closeAddRecruiterHandler}>
            <Paper
              sx={{
                borderRadius: '5px',
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
            >
              <Grid container justifyContent="center" alignItems="center">
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <SearchTextField
                    style={{ flexGrow: 1 }}
                    handleSearchTextChange={handleSearchTextChange}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <List disablePadding>
                    {!_.isEmpty(recruitersNonCompany) &&
                      recruitersNonCompany!.map(
                        (item: Recruiter, index: number) => (
                          <CustomListItem key={index}>
                            <NonCompanyRecruiterItem
                              data={item}
                              companyId={companyId}
                            />
                          </CustomListItem>
                        )
                      )}
                    {loading && (
                      <CircularProgress sx={{ my: 'auto' }} size={20} />
                    )}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Modal>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default OwnedRecruiterCard
