import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ArticleLayout from '@components/layouts/article'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import resumiroApi from '@apis/resumiroApi'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
const roles = [
  {
    value: 'candidate',
    label: 'Candidate'
  },
  {
    value: 'recruiter',
    label: 'Recruiter'
  },
  {
    value: 'admin_recruiter',
    label: 'Admin Recruiter'
  }
]

export default function SignUpPage() {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const username = data.get('username')
    const password = data.get('password')
    const address_wallet = data.get('wallet_address')
    const role = data.get('role')

    if (
      username!.toString().length < 1 ||
      password!.toString().length < 6 ||
      address_wallet!.toString().length < 1 ||
      role!.toString().length < 1 ||
      !username ||
      !password ||
      !address_wallet ||
      !role
    ) {
      return
    }

    const result = await resumiroApi
      .registerUser({
        username: username.toString(),
        password: password.toString(),
        address_wallet: address_wallet.toString(),
        role: role.toString()
      })
      .catch(err => {
        console.log(err)
      })
    if (result) {
      router.push('/dang-nhap')
    }
  }

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  return (
    <ArticleLayout title="Tạo tài khoản">
      <Typography
        component="h1"
        variant="h5"
        sx={{
          fontSize: '1.8rem',
          color: 'primary.main',
          textAlign: 'center',
          marginTop: 8,
          textTransform: 'uppercase'
        }}
      >
        Tạo tài khoản
      </Typography>
      <Container component="main" maxWidth="sm" sx={{ marginBottom: 8 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel required>Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="wallet_address"
                  label="Wallet Address"
                  name="wallet_address"
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  name="role"
                  id="role"
                  label="Role"
                  defaultValue="candidate"
                  SelectProps={{
                    native: true
                  }}
                >
                  {roles.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Đồng ý với các Điều khoản"
                  sx={{ fontWeight: 600 }}
                />
              </Grid>
            </Grid>
            <Container
              component="main"
              maxWidth="sm"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1.5,
                  textTransform: 'capitalize',
                  fontSize: '1.2rem'
                }}
              >
                Đăng ký
              </Button>
            </Container>
            <Grid container justifyContent="center">
              <Grid
                item
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '16px'
                  }}
                >
                  Đã có tài khoản? &nbsp;
                </Typography>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                >
                  <Link style={{ textDecoration: 'none' }} href="/dang-nhap">
                    Đăng nhập
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { req: any; res: any }) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session !== null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}
