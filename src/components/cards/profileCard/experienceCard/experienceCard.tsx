import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ExperienceItem from './experienceItem'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { Experience } from '@shared/interfaces'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { companies } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector, web3Selector } from '@redux/selectors'
import profileSlice, {
  createExperience,
  uploadExperience
} from '@redux/reducers/profileSlice'

interface ExperienceCardProps {
  type?: number
  style?: React.CSSProperties
  experiences?: Experience[]
  allCompanies: companies[]
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

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  type,
  style,
  experiences,
  allCompanies
}) => {
  const dispatch = useAppDispatch()
  const [isModify, setIsModify] = useState(false)
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const { loading, uploadExperienceLoading, uploadedExperience } =
    useAppSelector(profileSelector)
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modifyToggleHandler = () => {
    setIsModify(prev => !prev)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const position = data.get('position')!.toString()
    const company = data.get('company')!.toString()
    const start = data.get('start')!.toString()
    const finish = data.get('finish')!.toString()
    if (
      position === '' ||
      company === '' ||
      uploadedExperience === '' ||
      start === '' ||
      finish === ''
    ) {
      dispatch(
        profileSlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(profileSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    await resumiro.addExperience({
      id: null,
      position,
      start,
      finish,
      companyId: Number(company),
      userAddress: wallet.address
    })

    dispatch(
      createExperience({
        experience: {
          position: position,
          company_id: Number(company),
          start: start,
          finish: finish,
          user_id: Number(session!.user!.id),
          source: uploadedExperience
        },
        company_id: Number(company),
        content: 'Xác thực kinh nghiệm',
        owner_id: Number(session!.user!.id)
      })
    )

    setOpen(false)
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]

    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(uploadExperience(body))
    }
  }
  if (type === 2) {
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
                Kinh nghiệm
              </Typography>
            }
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ py: 'unset' }}>
            <List disablePadding>
              {experiences &&
                experiences!.map((item, index) => (
                  <CustomListItem key={index}>
                    <ExperienceItem
                      data={item}
                      allCompanies={allCompanies}
                      isModify={isModify}
                    />
                  </CustomListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>
    )
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
              Kinh nghiệm
            </Typography>
          }
          action={
            <>
              <IconButton onClick={handleOpen}>
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
            {experiences &&
              experiences!.map((item, index) => (
                <CustomListItem key={index}>
                  <ExperienceItem
                    data={item}
                    allCompanies={allCompanies}
                    isModify={isModify}
                  />
                </CustomListItem>
              ))}
          </List>

          <Modal open={open} onClose={handleClose}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                borderRadius: '5px',
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="start"
                    required
                    fullWidth
                    id="start"
                    label="Start"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="finish"
                    required
                    fullWidth
                    id="finish"
                    label="Finish"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="position"
                    required
                    fullWidth
                    id="position"
                    label="Position"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    name="company"
                    id="company"
                    label="Company"
                    SelectProps={{
                      native: true
                    }}
                  >
                    {allCompanies.map((company: companies, i) => (
                      <option value={company.id} key={i}>
                        {company.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    disableElevation
                    disableFocusRipple
                    endIcon={
                      uploadExperienceLoading && (
                        <CircularProgress color="secondary" size={18} />
                      )
                    }
                  >
                    {uploadedExperience !== ''
                      ? uploadedExperience.substring(21, 45) + '...'
                      : 'Tải file'}
                    <input
                      hidden
                      onChange={handleUploadFile}
                      accept="application/pdf"
                      type="file"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginTop: '1rem'
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      color="primary"
                      onClick={handleClose}
                      sx={{
                        mr: 1,
                        p: 1.5,
                        textTransform: 'capitalize',
                        fontSize: '1rem'
                      }}
                    >
                      Huỷ
                    </Button>
                    <Button
                      type="submit"
                      disableElevation
                      disableRipple
                      variant="contained"
                      color="secondary"
                      endIcon={loading && <CircularProgress size={18} />}
                      sx={{
                        p: 1.5,
                        textTransform: 'capitalize',
                        fontSize: '1rem'
                      }}
                    >
                      OK
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ExperienceCard
