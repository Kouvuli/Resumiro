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
import EducationItem from './educationItem'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { certificates, companies } from '@prisma/client'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { profileSelector, web3Selector } from '@redux/selectors'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import profileSlice, {
  createCertificate,
  uploadCertificate
} from '@redux/reducers/profileSlice'
import { CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
interface EducationCardProps {
  type?: number
  style?: React.CSSProperties
  educations?: certificates[]
  allCompanies?: companies[]
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

const EducationCard: React.FC<EducationCardProps> = ({
  type,
  style,
  educations,
  allCompanies
}) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const [isModify, setIsModify] = useState(false)
  const [open, setOpen] = useState(false)
  const { loading, uploadedCertificate, uploadCertificateLoading } =
    useAppSelector(profileSelector)
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')!.toString()
    const verified_at = data.get('verified_at')!.toString()
    const company = data.get('company')!.toString()

    if (
      company === '' ||
      name === '' ||
      verified_at === '' ||
      uploadedCertificate === ''
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

    await resumiro.addCertificate({
      name,
      expiredAt: Math.floor(new Date(verified_at).getTime() / 1000),
      source: uploadedCertificate,
      candidateAddress: wallet.address,
      companyId: Number(company)
    })
    dispatch(
      createCertificate({
        certificate: {
          name: name,
          verified_at: new Date(verified_at),
          source: uploadedCertificate,
          candidate_id: Number(session!.user!.id)
        },
        company_id: Number(company),
        content: 'Xác thực chứng chỉ',
        owner_id: Number(session!.user!.id)
      })
    )
    setOpen(false)
  }
  const modifyToggleHandler = () => {
    setIsModify(prev => !prev)
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]

    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(uploadCertificate(body))
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
                Học vấn
              </Typography>
            }
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ py: 'unset' }}>
            <List disablePadding>
              {educations &&
                educations!.map((education, index) => (
                  <CustomListItem key={index}>
                    <EducationItem data={education} isModify={isModify} />
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
              Học vấn
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
            {educations &&
              educations!.map((education, index) => (
                <CustomListItem key={index}>
                  <EducationItem data={education} isModify={isModify} />
                </CustomListItem>
              ))}
          </List>
        </CardContent>
      </Card>
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
                name="name"
                required
                fullWidth
                id="name"
                label="Chứng chỉ"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="verified_at"
                required
                fullWidth
                id="verified_at"
                label="Xác thực lúc"
                autoFocus
                type="date"
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
                defaultValue={new Date().toISOString().slice(0, 10)}
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
                {allCompanies &&
                  allCompanies.map((company: companies, i) => (
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
                  uploadCertificateLoading && (
                    <CircularProgress color="secondary" size={18} />
                  )
                }
              >
                {uploadedCertificate !== ''
                  ? uploadedCertificate.substring(21, 45) + '...'
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
    </motion.div>
  )
}

export default EducationCard
