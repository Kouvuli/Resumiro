import { useState, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { ethers } from 'ethers'
import { authOptions } from '../api/auth/[...nextauth]'
import signUpSlice, { signUp } from '@redux/reducers/signUpSlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { signUpSelector } from '@redux/selectors'
import MySnackBar from '@components/ui/bar/snackbar'
import _ from 'lodash'
import Resumiro from '../../interfaces/Resumiro'
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
    value: 'admin',
    label: 'Admin'
  }
]

export default function SignUpPage() {
  const { message, messageType, showMessage, user } =
    useAppSelector(signUpSelector)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setTimeout(() => {
        router.push('/dang-nhap')
        dispatch(signUpSlice.actions.reset())
      }, 1000)
    }
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const username = data.get('username')
    const password = data.get('password')

    const role = data.get('role')
    if (
      username!.toString().length < 4 ||
      password!.toString().length < 6 ||
      role!.toString().length < 1 ||
      !username ||
      !password ||
      walletAddress === '' ||
      !role
    ) {
      dispatch(
        signUpSlice.actions.changeSnackBarMessage({
          message:
            'Vui lòng nhập đầy đủ thông tin Mật khẩu phải có ít nhất 6 ký tự Username phải có ít nhất 4 ký tự(a-z,A-Z)',
          messageType: 'error'
        })
      )
      dispatch(signUpSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    try {
      const resumiro = provider ? new Resumiro(provider) : null
      if (!resumiro) throw new Error('Wallet went wrong!')
      let type!: number
      switch (role.toString()) {
        case 'candidate':
          type = 0
          break
        case 'recruiter':
          type = 1
          break
        case 'admin':
          type = 2
          break
      }
      let result: any = await resumiro.addUser({
        userAddress: walletAddress,
        type
      })
      console.log(result)
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
    dispatch(
      signUp({
        username: username,
        password: password,
        role: role,
        walletAddress: walletAddress
      })
    )
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }

    // {
    //   /* TESTING */
    //   const provider = new ethers.providers.Web3Provider(window.ethereum)
    //   await provider.send('wallet_requestPermissions', [
    //     {
    //       eth_accounts: {}
    //     }
    //   ])
    //   return
    // }

    // Get the wallet provider, the signer and address
    //  see: https://docs.ethers.org/v6/getting-started/#starting-signing
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // await provider.send('eth_requestAccounts', [])
    await provider.send('wallet_requestPermissions', [
      {
        eth_accounts: {}
      }
    ])

    const signer = provider.getSigner()
    const publicAddress = await signer.getAddress()

    setWalletAddress(publicAddress)
    setProvider(provider)
  }

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    dispatch(signUpSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Tạo tài khoản">
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
        Tạo tài khoản
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginBottom: 8 }}>
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
                <FormControl fullWidth variant="outlined" disabled>
                  <InputLabel required shrink={walletAddress ? true : false}>
                    Địa chỉ ví
                  </InputLabel>
                  <OutlinedInput
                    id="wallet_address"
                    label="Địa chỉ ví"
                    name="wallet_address"
                    value={walletAddress}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={connectWallet}
                        >
                          Kết nối ví
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
