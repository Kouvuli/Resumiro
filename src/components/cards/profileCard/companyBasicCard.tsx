import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import React, { useState } from 'react'
import { locations, companies } from '@prisma/client'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector, web3Selector } from '@redux/selectors'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import profileSlice, {
  updateCompany,
  updateRecruiterCompany,
  uploadBackground,
  uploadLogo
} from '@redux/reducers/profileSlice'
import { useSession } from 'next-auth/react'
import { Input } from 'antd'
import _ from 'lodash'
const { TextArea } = Input
interface CompanyBasicCardProps {
  type?: number
  style?: React.CSSProperties
  company?: companies
  isAdmin?: boolean
  allLocations?: locations[]
}

const CustomCard = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

const CompanyBasicCard: React.FC<CompanyBasicCardProps> = ({
  type,
  style,
  company,
  isAdmin,
  allLocations
}) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const {
    loading,
    uploadBackgroundLoading,
    uploadLogoLoading,
    uploadedLogo,
    uploadedBackground
  } = useAppSelector(profileSelector)
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const name = data.get('name')!.toString()
    const locationId = data.get('location')

    const scale = data.get('scale')!.toString()
    const about = data.get('about')!.toString()
    const website = data.get('website')!.toString()
    const address = data.get('address')!.toString()
    const introduction = data.get('introduction')!.toString()
    if (!company) {
      return
    }
    if (
      name === '' ||
      scale === '' ||
      !locationId ||
      scale === '' ||
      about === ''
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

    await resumiro.updateCompany({
      id: company.id,
      name,
      website,
      location: allLocations && allLocations[Number(locationId) - 1].name,
      address
    })

    dispatch(
      updateCompany({
        id: company.id,
        data: {
          name,
          logo: uploadedLogo !== '' ? uploadedLogo : company.logo,
          background:
            uploadedBackground !== '' ? uploadedBackground : company.background,
          scale: scale,
          about: about,
          location_id: Number(locationId),
          website: website,
          address: address,
          introduction: introduction
        }
      })
    )
    setOpen(false)
  }
  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]

    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(uploadLogo(body))
    }
  }
  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]
    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(uploadBackground(body))
    }
  }
  if (type === 2) {
    return (
      <Card sx={style}>
        <CardHeader
          title={
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontSize: '20px' }}
            >
              Công ty
            </Typography>
          }
        />
        {company && (
          <CardContent>
            <CustomCard>
              <CardHeader
                avatar={
                  <Image
                    width={70}
                    height={70}
                    alt={company.name}
                    src={
                      company.logo !== null
                        ? company.logo
                        : '/images/Images_1.png'
                    }
                  />
                }
                title={
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ mb: 1, fontSize: '1.2rem' }}
                  >
                    {company.name}
                  </Typography>
                }
                subheader={
                  <>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ mb: 1.4 }}
                    >
                      {company.introduction}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1.4 }}
                    >
                      {company.scale}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1.4 }}
                    >
                      {company.address}
                    </Typography>
                  </>
                }
              ></CardHeader>
            </CustomCard>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <Card sx={style}>
      <CardHeader
        title={
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontSize: '20px' }}
          >
            Công ty
          </Typography>
        }
        action={
          isAdmin && (
            <IconButton onClick={handleOpen}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {company && (
        <CardContent>
          <CustomCard>
            <CardHeader
              avatar={
                <Image
                  width={70}
                  height={70}
                  alt={company.name}
                  src={
                    company.logo !== null
                      ? company.logo
                      : '/images/Images_1.png'
                  }
                />
              }
              title={
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ mb: 1, fontSize: '1.2rem' }}
                >
                  {company.name}
                </Typography>
              }
              subheader={
                <>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ mb: 1.4 }}
                  >
                    {company.introduction}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1.4 }}
                  >
                    {company.scale}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1.4 }}
                  >
                    {company.address}
                  </Typography>
                </>
              }
            ></CardHeader>
          </CustomCard>
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
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    defaultValue={company.name}
                    label="Tên công ty"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="scale"
                    required
                    fullWidth
                    id="scale"
                    defaultValue={company.scale}
                    label="Quy mô"
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
                    defaultValue={company.location_id}
                    name="location"
                    id="location"
                    label="Vị trí"
                    SelectProps={{
                      native: true
                    }}
                  >
                    {!_.isEmpty(allLocations) &&
                      allLocations!.map((item: locations, i) => (
                        <option value={item.id} key={i}>
                          {item.name}
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
                      uploadLogoLoading && (
                        <CircularProgress color="secondary" size={18} />
                      )
                    }
                  >
                    {uploadedLogo
                      ? uploadedLogo.substring(21, 45) + '...'
                      : 'Tải logo'}
                    <input
                      hidden
                      onChange={handleUploadLogo}
                      accept="image/*"
                      type="file"
                    />
                  </Button>
                  <Button
                    sx={{ marginLeft: '1rem' }}
                    variant="contained"
                    component="label"
                    disableElevation
                    disableFocusRipple
                    endIcon={
                      uploadBackgroundLoading && (
                        <CircularProgress color="secondary" size={18} />
                      )
                    }
                  >
                    {uploadedBackground
                      ? uploadedBackground.substring(21, 45) + '...'
                      : 'Tải Background'}
                    <input
                      hidden
                      onChange={handleUploadBackground}
                      accept="image/*"
                      type="file"
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextArea
                    id="about"
                    defaultValue={company.about}
                    style={{ height: 120 }}
                    showCount
                    name="about"
                    rows={6}
                    placeholder="Tối đa 1000 ký tự"
                    maxLength={1000}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="address"
                    required
                    fullWidth
                    id="address"
                    defaultValue={company.address}
                    label="Địa chỉ"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="website"
                    required
                    fullWidth
                    id="website"
                    defaultValue={company.website}
                    label="Trang web"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="introduction"
                    required
                    fullWidth
                    id="introduction"
                    defaultValue={company.introduction}
                    label="Lời chào"
                    autoFocus
                    color="primary"
                    sx={{
                      borderRadius: '5px'
                    }}
                  />
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
      )}
    </Card>
  )
}

export default CompanyBasicCard
