import React from 'react'
// import './style.css'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

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
        marginBottom: '10px'
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
        transition: 'all 0.5s ease'
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
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle>company</FooterTitle>
                        <CustomList>
                            <li>
                                <a href="#">about us</a>
                            </li>
                            <li>
                                <a href="#">our services</a>
                            </li>
                            <li>
                                <a href="#">privacy policy</a>
                            </li>
                            <li>
                                <a href="#">affiliate program</a>
                            </li>
                        </CustomList>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle>get help</FooterTitle>
                        <CustomList>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">shipping</a>
                            </li>
                            <li>
                                <a href="#">returns</a>
                            </li>
                            <li>
                                <a href="#">order status</a>
                            </li>
                            <li>
                                <a href="#">payment options</a>
                            </li>
                        </CustomList>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle>online shop</FooterTitle>
                        <CustomList>
                            <li>
                                <a href="#">watch</a>
                            </li>
                            <li>
                                <a href="#">bag</a>
                            </li>
                            <li>
                                <a href="#">shoes</a>
                            </li>
                            <li>
                                <a href="#">dress</a>
                            </li>
                        </CustomList>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle>follow us</FooterTitle>
                        <SocialLink>
                            <a href="#">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </SocialLink>
                    </Grid>
                </Grid>
            </Container>
        </CustomFooterBackground>
    )
}

export default Footer
