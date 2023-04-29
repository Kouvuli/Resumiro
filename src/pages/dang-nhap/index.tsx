import { useEffect } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ArticleLayout from '@components/layouts/article'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { signInSelector } from '@redux/selectors'
import signInSlice, {
  signInNormal,
  signInWallet
} from '@redux/reducers/signInSlice'
import MySnackBar from '@components/ui/bar/snackbar'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useSession } from 'next-auth/react'

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

export default function SignInPage() {
  const { message, messageType, showMessage, success } =
    useAppSelector(signInSelector)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { status } = useSession()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const role = data.get('role')
    const username = data.get('username')
    const password = data.get('password')

    if (!username || !password || !role) {
      dispatch(
        signInSlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(signInSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    dispatch(
      signInNormal({
        username: username,
        password: password,
        role: role
      })
    )
  }

  const handleSignInWallet = async () => {
    dispatch(signInWallet())
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(signInSlice.actions.toggleSnackBar({ showMessage: false }))
  }

  if (status === 'authenticated') {
    router.push('/')
  }
  return (
    <ArticleLayout title="Đăng nhập">
      <MySnackBar
        handleClose={handleClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
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
        Đăng nhập
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 1, color: 'text.primary', textAlign: 'center' }}
      >
        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
        tưởng
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginBottom: 8 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            variant="outlined"
            sx={{
              mt: 3,
              p: 2,
              display: 'flex',
              borderRadius: '1rem',
              flexDirection: 'column',
              fontSize: '1rem',
              textTransform: 'none',
              lineHeight: '1.5rem',
              maxWidth: '15%'
            }}
            onClick={handleSignInWallet}
          >
            <AccountBalanceWalletIcon sx={{ mb: 0.7, fontSize: '1.5rem' }} />
            Wallet
          </Button>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="primary"
              sx={{
                borderRadius: '5px'
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
              sx={{
                borderRadius: '5px'
              }}
            />
            <TextField
              required
              fullWidth
              select
              name="role"
              id="role"
              label="Role"
              defaultValue="candidate"
              sx={{ mt: 2 }}
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
            <Grid container>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  sx={{ color: '#1B3764' }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <Link
                  href="#"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
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
              Đăng nhập
            </Button>
            <div
              style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '16px'
                }}
              >
                Chưa có tài khoản? &nbsp;
              </Typography>

              <Typography
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                <Link style={{ textDecoration: 'none' }} href="/dang-ky">
                  Đăng ký
                </Link>
              </Typography>
            </div>
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
