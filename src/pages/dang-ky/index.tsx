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

const theme = createTheme()

export default function SignUp() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password')
        })
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
                Tạo tài khoản
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
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="ho"
                                    required
                                    fullWidth
                                    id="ho"
                                    label="Họ"
                                    autoFocus
                                    sx={{
                                        backgroundColor: '#1B3764',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="ten"
                                    label="Tên"
                                    name="ten"
                                    autoComplete="family-name"
                                    sx={{
                                        backgroundColor: '#1B3764',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    sx={{
                                        backgroundColor: '#1B3764',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    sx={{
                                        backgroundColor: '#1B3764',
                                        borderRadius: '5px'
                                    }}
                                />
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
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="Đồng ý với các Điều khoản"
                                    sx={{ color: '#1B3764', fontWeight: 600 }}
                                />
                            </Grid>
                        </Grid>
                        <Container component="main" maxWidth="sm" sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                            <Button
                                type="submit"
                                // fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: '300px',
                                    height: '45px',
                                    color: '#1B3764',
                                    backgroundColor: '#FFCA42',
                                    fontWeight: 600,
                                }}
                            >
                                Sign Up
                            </Button>
                        </Container>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/dang-nhap" variant="body2" sx={{textDecoration: 'none', display: 'flex', justifyContent: 'center'}}>
                                <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    color: '#BEBCBC',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                Đã có tài khoản? &nbsp;
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
                               Đăng nhập
                            </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
