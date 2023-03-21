import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    // palette: {
    //     primary: {
    //         darkBlue: '#1B3764',
    //     },
    //     warning: {
    //         yellow: '#FFCA42',
    //     },
    // }
})

export default function SignIn() {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log({ email, password })
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    fontSize: '64px',
                    color: '#1B3764',
                    textAlign: 'center',
                    marginTop: 8,
                }}
            >
                Đăng nhập
            </Typography>
            <Typography
                component="h3"
                variant="h5"
                sx={{ fontSize: '16px', color: '#1B3764', textAlign: 'center' }}
            >
                Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự
                nghiệp lý tưởng
            </Typography>
            <Container component="main" maxWidth="sm" sx={{marginBottom: 8}}>
                <CssBaseline />
                <Box
                    sx={{
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
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            color="secondary"
                            sx={{
                                backgroundColor: '#1B3764',
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
                            color="secondary"
                            sx={{
                                backgroundColor: '#1B3764',
                                borderRadius: '5px'
                            }}
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
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
                                    variant="body2"
                                    sx={{
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
                            sx={{
                                mt: 3,
                                mb: 2,
                                color: '#1B3764',
                                backgroundColor: '#FFCA42',
                                fontWeight: 600,
                            }}
                        >
                            Đăng nhập
                        </Button>

                        <Link href="/dang-ky" variant="body2" sx={{textDecoration: 'none', display: 'flex', justifyContent: 'center'}}>
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    color: '#BEBCBC',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                Chưa có tài khoản? &nbsp;
                            </Typography>
                            <Typography
                                component="h3"
                                variant="h5"
                                sx={{
                                  color: '#1B3764',
                                  fontSize: '16px',
                                  fontWeight: 600,
                                }}
                            >
                               Đăng ký
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
