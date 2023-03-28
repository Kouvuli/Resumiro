import React, { useEffect, useRef } from 'react'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useRouter } from 'next/router'
import MyPopover from '@components/ui/popover'
import Link from 'next/link'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'
import profileSlice from '@redux/reducers/profileSlice'
const BackgroundHeader = styled('header')(({}) => ({
  backgroundColor: 'transparent',
  position: 'relative',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.15)',
  // padding: ' 12px 0',
  lineHeight: '1.5'
}))
const BackgroundHeaderHome = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'relative',
  // boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.15)',
  // padding: ' 12px 0',
  lineHeight: '1.5'
}))

const CustomHeader = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      width: '100%',
      padding: 0,
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden',
      transition: 'all 0.5s ease',
      '&.open': {
        visibility: 'visible'
      },
      '& ul': {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 15px 0',
        marginTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        '& li': {
          display: 'block',
          margin: 0
        }
      }
    }
  },
  height: '95px',
  display: 'flex',
  // flexWrap: 'wrap',
  alignItems: 'center',
  // justifyContent: 'space-between',
  '& .logo a': {
    fontSize: '25px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  '& .nav ul li': {
    display: 'inline-block',
    marginLeft: '35px',
    '& a': {
      display: 'block',
      fontSize: '14px',

      textTransform: 'capitalize',
      color: theme.palette.text.primary,
      padding: '10px 0',
      transition: 'all 0.5s ease',
      '&.active,&:hover': {
        textShadow: `0px 0px 0.6px ${theme.palette.text.primary}`
      }
    }
  }
}))

const CustomHeaderHome = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      width: '100%',
      padding: 0,
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden',
      transition: 'all 0.5s ease',
      '&.open': {
        visibility: 'visible'
      },
      '& ul': {
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 15px 0',
        marginTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        '& li': {
          display: 'block',
          margin: 0
        }
      }
    }
  },
  height: '95px',
  display: 'flex',
  // flexWrap: 'wrap',
  alignItems: 'center',
  // justifyContent: 'space-between',
  color: theme.palette.primary.contrastText,
  '& .logo a': {
    fontSize: '25px',
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.primary.contrastText
  },
  '& .nav ul li': {
    display: 'inline-block',
    marginLeft: '35px',
    '& a': {
      display: 'block',
      fontSize: '14px',

      textTransform: 'capitalize',
      color: theme.palette.primary.contrastText,
      padding: '10px 0',
      transition: 'all 0.5s ease',
      '&.active,&:hover': {
        textShadow: `0px 1px 1px ${theme.palette.primary.contrastText}`
      }
    }
  }
}))

const CustomNavToggler = styled('button')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block'
  },
  height: '34px',
  width: '44px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  display: 'none',
  marginRight: '15px',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 15px rgba(255,255,255,0.5)'
  },
  '& span': {
    height: '2px',
    width: '20px',
    backgroundColor: theme.palette.secondary.main,
    display: 'block',
    margin: 'auto',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&::after': {
      transform: 'translateY(6px)'
    },
    '&::before': {
      transform: 'translateY(-6px)'
    }
  },
  '&.active span': {
    backgroundColor: 'transparent',
    '&::after': {
      transform: 'rotate(135deg)'
    },
    '&::before': {
      transform: 'rotate(45deg)'
    }
  },
  '& span::before,& span::after': {
    content: `''`,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease'
  }
}))

const variants: Variants = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

const Header = () => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const { showMessage, user } = useAppSelector(profileSelector)
  const router = useRouter()
  const navTogglerRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const onToggleHander = () => {
    const navNode = navRef.current
    navNode?.classList.toggle('open')
    navTogglerRef.current!.classList.toggle('active')
    if (navNode!.classList.contains('open')) {
      navNode!.style.maxHeight = navNode?.scrollHeight + 'px'
    } else {
      navNode!.removeAttribute('style')
    }
  }

  const signOutHandler = async () => {
    // event.preventDefault()
    dispatch(profileSlice.actions.reset())
    const result = await signOut({ redirect: false })
    if (result) {
      router.replace('/dang-nhap')
    }
  }
  const userContent = (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <Link href="/ca-nhan">
            <ListItemText primary="Cá nhân" />
          </Link>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={signOutHandler}>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </ListItem>
    </List>
  )
  if (router.pathname === '/') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          variants={variants}
          initial="initial"
          animate="visible"
          exit="exit"
        >
          <BackgroundHeaderHome>
            <Container>
              <CustomHeaderHome style={{ color: 'primary.contrastText' }}>
                <div className="logo">
                  <Link href="/">Resumiro.</Link>
                </div>
                <nav ref={navRef} className="nav">
                  <ul>
                    <li>
                      <Link href="/viec-lam">
                        {/* <a href="#" className="active"> */}
                        Việc làm
                        {/* </a> */}
                      </Link>
                    </li>
                    {session && (
                      <li>
                        {user.role === 'candidate' ? (
                          <Link href="/ho-so-cv/ung-vien">Hồ sơ & CV</Link>
                        ) : (
                          <Link href="/ho-so-cv">Hồ sơ & CV</Link>
                        )}
                      </li>
                    )}
                    <li>
                      <Link href="/cong-ty">Công ty</Link>
                    </li>
                  </ul>
                </nav>
                <div style={{ flexGrow: 1 }} />
                {session && (
                  <>
                    <IconButton
                      sx={{
                        mr: 2,
                        color: 'primary.contrastText'
                      }}
                    >
                      <FavoriteBorderOutlinedIcon />
                    </IconButton>
                    <MyPopover
                      placement="bottomRight"
                      content={userContent}
                      trigger="click"
                    >
                      <Avatar src={session!.user!.image!} />
                    </MyPopover>
                  </>
                )}
                {!session && (
                  <>
                    <Button
                      disableElevation
                      variant="outlined"
                      sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        py: 1.3,
                        px: 2,
                        textTransform: 'capitalize',
                        fontSize: '1rem',
                        '&:hover': {
                          borderColor: '#e0e0e0',
                          color: '#e0e0e0'
                        }
                      }}
                    >
                      <Link
                        href="/dang-ky"
                        style={{ textTransform: 'capitalize' }}
                      >
                        Đăng ký
                      </Link>
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      color="secondary"
                      sx={{
                        ml: 3,
                        py: 1.3,
                        px: 2,
                        textTransform: 'capitalize',
                        fontSize: '1rem'
                      }}
                    >
                      <Link
                        href="/dang-nhap"
                        style={{ textTransform: 'capitalize' }}
                      >
                        Đăng nhập
                      </Link>
                    </Button>
                  </>
                )}
                <CustomNavToggler
                  type="button"
                  ref={navTogglerRef}
                  onClick={onToggleHander}
                >
                  <span></span>
                </CustomNavToggler>
              </CustomHeaderHome>
            </Container>
          </BackgroundHeaderHome>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <BackgroundHeader>
        <Container>
          <CustomHeader>
            <div className="logo">
              <Link href="/">Resumiro.</Link>
            </div>
            <nav ref={navRef} className="nav">
              <ul>
                <li>
                  <Link href="/viec-lam">Việc làm</Link>
                </li>
                {session && (
                  <li>
                    {user.role === 'candidate' ? (
                      <Link href="/ho-so-cv/ung-vien">Hồ sơ & CV</Link>
                    ) : (
                      <Link href="/ho-so-cv">Hồ sơ & CV</Link>
                    )}
                  </li>
                )}
                <li>
                  <Link href="/cong-ty">Công ty</Link>
                </li>
              </ul>
            </nav>
            <div style={{ flexGrow: 1 }} />
            {session && (
              <>
                <IconButton sx={{ mr: 2 }}>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
                <MyPopover
                  placement="bottomRight"
                  content={userContent}
                  trigger="click"
                >
                  <Avatar src={session!.user!.image!} />
                </MyPopover>
              </>
            )}
            {!session && (
              <>
                <Button
                  disableElevation
                  variant="outlined"
                  color="primary"
                  sx={{
                    py: 1.3,
                    px: 2,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  <Link href="/dang-ky" style={{ textTransform: 'capitalize' }}>
                    Đăng ký
                  </Link>
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 3,
                    py: 1.3,
                    px: 2,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  <Link
                    href="/dang-nhap"
                    style={{ textTransform: 'capitalize' }}
                  >
                    Đăng nhập
                  </Link>
                </Button>
              </>
            )}
            <CustomNavToggler
              type="button"
              ref={navTogglerRef}
              onClick={onToggleHander}
            >
              <span></span>
            </CustomNavToggler>
          </CustomHeader>
        </Container>
      </BackgroundHeader>
    </motion.div>
  )
}

export default Header
