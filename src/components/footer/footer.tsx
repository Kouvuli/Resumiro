import React from 'react'
// import './style.css'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'

const CustomFooterBackground = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '50px 0 70px'
}))

const FooterTitle = styled('h4')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '1.5rem'
  },
  color: '#ffffff',
  textTransform: 'capitalize',
  marginBottom: '35px',
  // fontWeight: 500,
  fontSize: '1.2rem',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-10px',
    backgroundColor: theme.palette.secondary.main,
    height: '2px',
    boxSizing: 'border-box',
    width: '50px'
  }
}))

const CustomList = styled('ul')(({}) => ({
  listStyle: 'none',
  '& li:not(:last-child)': {
    marginBottom: '15px'
  },
  '& li a': {
    fontSize: '16px',
    textTransform: 'capitalize',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '300',
    display: 'block',
    transition: 'all 0.3s ease'
  },
  '& li a:hover': {
    color: '#ffffff',
    paddingLeft: '8px'
  }
}))

const SocialLink = styled('div')(({}) => ({
  '& a': {
    display: 'inline-block',
    height: '40px',
    width: '40px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '0 10px 10px 0',
    textAlign: 'center',
    lineHeight: '40px',
    borderRadius: '50%',
    color: '#ffffff',
    transition: 'all 0.5s ease',
    paddingTop: '6px'
  },
  '& a:hover': {
    color: '#24262b',
    backgroundColor: '#ffffff'
  }
}))

const Footer: React.FC = () => {
  return (
    <CustomFooterBackground>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="start"
          alignContent="content"
          columnSpacing={5}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h5"
              sx={{ color: 'primary.contrastText', mb: 2 }}
            >
              Resumiro.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '1rem',
                lineHeight: '1.3rem',
                color: 'primary.contrastText'
              }}
            >
              Cơ hội tham gia vào những công ty, doanh nghiệp hàng đầu Việt Nam.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle>Trợ giúp</FooterTitle>
            <CustomList>
              <li>
                <Link href="#">Chính sách và điều khoản</Link>
              </li>
              <li>
                <Link href="/ve-chung-toi">Về chúng tôi</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </CustomList>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle>Dịch vụ</FooterTitle>
            <CustomList>
              <li>
                <Link href="/viec-lam">Việc làm</Link>
              </li>
              <li>
                <Link href="/cong-ty">Công ty</Link>
              </li>
              <li>
                <Link href="/dang-ky">Đăng ký</Link>
              </li>
            </CustomList>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FooterTitle>Theo dõi</FooterTitle>
            <SocialLink>
              <a href="#">
                <FacebookIcon />
              </a>
              <a href="#">
                <YouTubeIcon />
              </a>
              <a href="#">
                <InstagramIcon />
              </a>
              <a href="#">
                <LinkedInIcon />
              </a>
            </SocialLink>
          </Grid>
        </Grid>
      </Container>
    </CustomFooterBackground>
  )
}

export default Footer
