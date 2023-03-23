import * as React from 'react'
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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

export default function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password
    })
    if (!result!.error) {
      router.replace('/')
    }
  }

  return (
    <ArticleLayout title="Đăng nhập">
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
              value={username}
              onChange={e => setUsername(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              color="primary"
              sx={{
                borderRadius: '5px'
              }}
            />
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
