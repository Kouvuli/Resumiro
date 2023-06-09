import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import CompanyCard, { CompanyCardProps } from '@components/cards/companyCard'
import RoundPagination from '@components/ui/pagination/roundPagination'
import ArticleLayout from '@components/layouts/article'

import companySlice, {
  createCompany,
  fetchUserById,
  getCompanies,
  updateRecruiterCompany,
  uploadBackground,
  uploadLogo
} from '@redux/reducers/companySlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useRouter } from 'next/router'
import { companySelector, web3Selector } from '@redux/selectors'
import Image from 'next/image'
import _ from 'lodash'
import { Box, Button, CircularProgress, Modal, TextField } from '@mui/material'
import { Input } from 'antd'
import { locations } from '@prisma/client'
import MySnackBar from '@components/ui/bar/snackbar'
import { useSession } from 'next-auth/react'
import prisma from '@libs/prisma'
const { TextArea } = Input

interface CompanyPageProps {
  allLocations: locations[]
}

const orderOptions = [
  {
    value: 'alphabet',
    label: 'A-Z'
  }
]

const CompanyPage: React.FC<CompanyPageProps> = ({ allLocations }) => {
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {
    showMessage,
    message,
    messageType,
    uploadLogoLoading,
    uploadBackgroundLoading,
    uploadedLogo,
    uploadedBackground,
    loading,
    page,
    limit,
    createdCompany,
    q,
    total,
    location,
    order_by,
    hasAddCompany,
    data
  } = useAppSelector(companySelector)
  const { resumiro } = useAppSelector(web3Selector)
  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(fetchUserById(session!.user!.id))
    }
  }, [])

  useEffect(() => {
    dispatch(getCompanies(router.query))
  }, [router.query])

  useEffect(() => {
    if (createdCompany) {
      dispatch(
        updateRecruiterCompany({
          id: Number(session!.user!.id),
          data: {
            company_id: Number(createdCompany.id)
          }
        })
      )
    }
  }, [createdCompany])
  const handleOpenAddCompanyModal = () => {
    dispatch(companySlice.actions.reset())
    setOpen(true)
  }
  const handleCloseAddCompanyModal = () => setOpen(false)
  const searchHandler = () => {
    let query: any = {}
    if (page !== '') {
      query.page = 1
    }
    if (limit !== '') {
      query.limit = limit
    }
    if (q !== '') {
      query.q = q
    }
    if (location !== '') {
      query.location = location
    }
    if (order_by !== '') {
      query.order_by = order_by
    }

    router.push({
      pathname: router.pathname,
      query: query
    })
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(companySlice.actions.changeSearchText(e.target.value))
  }

  const handleCompanyLocationChange = (value: string) => {
    dispatch(companySlice.actions.changeLocation(value))
  }
  const handleCompanyOrderChange = (value: string) => {
    dispatch(companySlice.actions.changeOrderBy(value))
  }

  const handleAddCompanySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    // await resumiro.addCompany({
    //   name: 'google',
    //   location: 'TP.Hồ Chí Minh',
    //   adminAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
    // })
    // return

    const data = new FormData(event.currentTarget)
    const name = data.get('name')!.toString()
    const locationId = data.get('location')

    // console.log(allLocations[Number(locationId) - 1].name)
    // return

    const scale = data.get('scale')!.toString()
    const about = data.get('about')!.toString()
    if (
      name === '' ||
      scale === '' ||
      uploadedBackground === '' ||
      uploadedLogo === '' ||
      !locationId ||
      scale === '' ||
      about === ''
    ) {
      dispatch(
        companySlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(companySlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }

    await resumiro.addCompany({
      name,
      location: allLocations[Number(locationId) - 1].name
    })

    dispatch(
      createCompany({
        name,
        logo: uploadedLogo,
        background: uploadedBackground,
        scale: scale,
        about: about,
        location_id: Number(locationId)
      })
    )

    router.push({
      pathname: router.pathname
    })
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

  const handleSnackBarClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    dispatch(companySlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Công ty">
      <MySnackBar
        handleClose={handleSnackBarClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
      <Container>
        <Modal open={open} onClose={handleCloseAddCompanyModal}>
          <Box
            component="form"
            noValidate
            onSubmit={handleAddCompanySubmit}
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
                  name="location"
                  id="location"
                  label="Vị trí"
                  SelectProps={{
                    native: true
                  }}
                >
                  {allLocations.map((item: locations, i) => (
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
                  style={{ height: 120 }}
                  showCount
                  name="about"
                  rows={6}
                  placeholder="Tối đa 1000 ký tự"
                  maxLength={1000}
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
                    onClick={handleCloseAddCompanyModal}
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
        <Grid
          container
          marginTop="1rem "
          marginBottom="5rem"
          rowSpacing={2}
          columnSpacing={3}
        >
          <SearchBar
            handleChangeLocation={handleCompanyLocationChange}
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
            hasLocationSelect
            handleAddCompany={handleOpenAddCompanyModal}
            hasAddCompany={hasAddCompany}
          />
          {data && (
            <SearchResultBar
              numberSearch={data.length}
              handleChange={handleCompanyOrderChange}
              options={orderOptions}
            />
          )}
          {!_.isEmpty(data) ? (
            data.map(
              (
                company: JSX.IntrinsicAttributes & CompanyCardProps,
                index: React.Key | null | undefined
              ) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <CompanyCard {...company} />
                </Grid>
              )
            )
          ) : (
            <Image
              style={{ display: 'flex', margin: 'auto' }}
              src="/images/no-data-found.gif"
              height="450"
              width="450"
              alt="data-not-found"
            />
          )}

          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              display: 'flex',
              mt: 4
            }}
          >
            <RoundPagination page={Number(page)} totalPage={Number(total)} />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps() {
  const allLocations = await prisma.locations.findMany()

  return {
    props: {
      allLocations: allLocations
    }
  }
}

export default CompanyPage
