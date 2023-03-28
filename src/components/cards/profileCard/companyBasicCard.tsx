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
import { companies } from '@prisma/client'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { updateRecruiterCompany } from '@redux/reducers/profileSlice'
import { useSession } from 'next-auth/react'
interface CompanyBasicCardProps {
  type?: number
  style?: React.CSSProperties
  company: companies
  allCompanies?: companies[]
}

const CustomCard = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

const CompanyBasicCard: React.FC<CompanyBasicCardProps> = ({
  type,
  style,
  company,
  allCompanies
}) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { loading } = useAppSelector(profileSelector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const company = data.get('company')!.toString()

    dispatch(
      updateRecruiterCompany({
        id: Number(session!.user!.name),
        data: {
          company_id: Number(company)
        }
      })
    )
    setOpen(false)
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
          <IconButton onClick={handleOpen}>
            <CreateIcon />
          </IconButton>
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
            <Grid item xs={12}>
              {allCompanies && (
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
                  {allCompanies!.map((company: companies, i) => (
                    <option value={company.id} key={i}>
                      {company.name}
                    </option>
                  ))}
                </TextField>
              )}
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
    </Card>
  )
}

export default CompanyBasicCard
