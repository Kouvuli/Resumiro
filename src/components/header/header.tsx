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
import { useRouter } from 'next/router'
import MyPopover from '@components/ui/popover'
import Link from 'next/link'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { headerSelector } from '@redux/selectors'
import profileSlice from '@redux/reducers/profileSlice'
import socket from '@libs/socket'
import headerSlice, {
  fetchUserById,
  fetchUserNotification,
  readAllNotifications
} from '@redux/reducers/headerSlice'
import _ from 'lodash'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationCard from '@components/cards/notificationCard'
import signInSlice from '@redux/reducers/signInSlice'
import Typography from '@mui/material/Typography'
import { Notification } from '@shared/interfaces'
import MySnackBar from '@components/ui/bar/snackbar'
import resumeSlice from '@redux/reducers/resumeSlice'
import jobSlice from '@redux/reducers/jobSlice'
import companySlice from '@redux/reducers/companySlice'
import authRequestSlice from '@redux/reducers/authRequestSlice'
import web3Slice, { reconnectWeb3 } from '@redux/reducers/web3Slice'
// import '../../styles/header/header.css'

const BackgroundHeader = styled('header')(({}) => ({
  backgroundColor: 'transparent',
  padding: '32px 0',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.15)',
  lineHeight: '1.5'
}))
const BackgroundHeaderHome = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '32px 0',
  lineHeight: '1.5'
}))

const CustomHeader = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden'
    }
  },

  display: 'flex',
  alignItems: 'center',
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
      textTransform: 'capitalize',
      color: theme.palette.text.primary,
      padding: '10px 0',
      transition: 'all 0.5s ease',
      '&.active,&:hover': {
        textShadow: `0px 1px 1px ${theme.palette.text.primary}`
      }
    }
  }
}))

const MobileNavBarHome = styled('div')(({ theme }) => ({
  '& .nav': {
    maxHeight: '0px',
    overflow: 'hidden',
    visibility: 'hidden'
  },
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      padding: 0,
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden',
      transition: 'max-height 0.5s ease',
      '&.open': {
        visibility: 'visible'
      },
      '& ul': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        '& li': {
          display: 'block',
          margin: 0,
          textTransform: 'capitalize',
          color: theme.palette.primary.contrastText,
          padding: '10px 0',
          transition: 'all 0.5s ease',
          '&.active,&:hover': {
            textShadow: `0px 1px 1px ${theme.palette.primary.contrastText}`
          }
        }
      }
    }
  }
}))

const MobileNavBar = styled('div')(({ theme }) => ({
  '& .nav': {
    maxHeight: '0px',
    overflow: 'hidden',
    visibility: 'hidden'
  },
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      padding: 0,
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden',
      transition: 'max-height 0.5s ease',
      '&.open': {
        visibility: 'visible'
      },
      '& ul': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        '& li': {
          display: 'block',
          margin: 0,
          textTransform: 'capitalize',
          color: theme.palette.text.primary,
          padding: '10px 0',
          transition: 'all 0.5s ease',
          '&.active,&:hover': {
            textShadow: `0px 1px 1px ${theme.palette.primary.contrastText}`
          }
        }
      }
    }
  }
}))

const CustomHeaderHome = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& .nav': {
      maxHeight: '0px',
      overflow: 'hidden',
      visibility: 'hidden'
    }
  },
  display: 'flex',
  alignItems: 'center',
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
  marginLeft: '16px',
  height: '34px',
  width: '44px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  display: 'none',
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
  const { data: session, status } = useSession()
  const dispatch = useAppDispatch()
  const {
    notificationList,
    refreshNotification,
    showMessage,
    message,
    messageType,
    unreadNotification
  } = useAppSelector(headerSelector)
  const router = useRouter()
  const navTogglerRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(fetchUserNotification(Number(session!.user!.id)))
      dispatch(fetchUserById(session!.user!.id))
    }
  }, [refreshNotification, session])

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(reconnectWeb3())
    }
  }, [status])

  useEffect(() => {
    socket.on('receive_message', _data => {
      dispatch(headerSlice.actions.refreshNotification(!refreshNotification))
    })
  }, [socket])
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

  const NavBar = (
    <ul>
      <li>
        <Link href="/viec-lam">Việc làm</Link>
      </li>
      {session && (
        <li>
          {session.user!.role === 'candidate' ? (
            <Link href="/ho-so-cv/ung-vien">Hồ sơ & CV</Link>
          ) : (
            <Link href="/ho-so-cv">Hồ sơ & CV</Link>
          )}
        </li>
      )}
      <li>
        <Link href="/cong-ty">Công ty</Link>
      </li>
      {session && session.user!.role === 'admin' && (
        <li>
          <Link href="/yeu-cau-xac-thuc">Yêu cầu xác thực</Link>
        </li>
      )}
    </ul>
  )

  const signOutHandler = async () => {
    // event.preventDefault()
    dispatch(profileSlice.actions.reset())
    dispatch(authRequestSlice.actions.reset())
    dispatch(jobSlice.actions.reset())
    dispatch(companySlice.actions.reset())
    dispatch(headerSlice.actions.reset())
    dispatch(signInSlice.actions.reset())
    dispatch(resumeSlice.actions.reset())
    dispatch(web3Slice.actions.reset())
    const result = await signOut({ redirect: false })
    if (result) {
      router.replace('/dang-nhap')
    }
  }

  const readAllNotifiations = () => {
    dispatch(readAllNotifications(Number(session?.user?.id)))
  }

  const convertNotificationList = (notificationList: Notification[]) => {
    if (notificationList.length === 0)
      return (
        <Typography variant="body1" sx={{ textAlign: 'center', p: 5 }}>
          Không có thông báo nào
        </Typography>
      )
    return (
      <List
        sx={{
          maxWidth: 360,
          overflow: 'auto',
          maxHeight: 300
        }}
      >
        <ListItem>
          <Typography variant="h5">Thông báo</Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            disableElevation
            disableFocusRipple
            variant="text"
            onClick={readAllNotifiations}
            sx={{ textTransform: 'none' }}
          >
            Xem hết
          </Button>
        </ListItem>
        {notificationList.map(item => (
          <ListItem disablePadding key={item.notification.id}>
            <NotificationCard
              id={item.notification.id}
              isRead={item.is_read}
              type={item.notification.notification_type_id}
              object_id={item.notification.object_url!}
              author={item.notification.author}
              createAt={item.notification.create_at}
              content={item.notification.content!}
            />
          </ListItem>
        ))}
      </List>
    )
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
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    dispatch(headerSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  if (router.pathname === '/') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          variants={variants}
          initial="initial"
          animate="visible"
          exit="exit"
        >
          <MySnackBar
            handleClose={handleClose}
            message={message}
            messageType={messageType}
            showMessage={showMessage}
          />
          <BackgroundHeaderHome>
            <Container>
              <CustomHeaderHome style={{ color: 'primary.contrastText' }}>
                <div className="logo">
                  <Link href="/">Resumiro.</Link>
                </div>
                <nav className="nav">{NavBar}</nav>
                <div style={{ flexGrow: 1 }} />
                {session && (
                  <>
                    <MyPopover
                      placement="bottomRight"
                      content={convertNotificationList(notificationList)}
                      trigger="click"
                    >
                      <Badge
                        sx={{
                          mr: 3
                        }}
                        badgeContent={unreadNotification}
                        color="secondary"
                      >
                        <NotificationsIcon
                          sx={{ color: 'primary.contrastText' }}
                        />
                      </Badge>
                    </MyPopover>

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
              <MobileNavBarHome>
                <nav ref={navRef} className="nav">
                  {NavBar}
                </nav>
              </MobileNavBarHome>
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
        <MySnackBar
          handleClose={handleClose}
          message={message}
          messageType={messageType}
          showMessage={showMessage}
        />
        <Container>
          <CustomHeader>
            <div className="logo">
              <Link href="/">Resumiro.</Link>
            </div>
            <nav className="nav">{NavBar}</nav>
            <div style={{ flexGrow: 1 }} />
            {session && (
              <>
                <MyPopover
                  placement="bottomRight"
                  content={convertNotificationList(notificationList)}
                  trigger="click"
                >
                  <Badge
                    sx={{
                      mr: 3
                    }}
                    badgeContent={unreadNotification}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </MyPopover>
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
          <MobileNavBar>
            <nav ref={navRef} className="nav">
              {NavBar}
            </nav>
          </MobileNavBar>
        </Container>
      </BackgroundHeader>
    </motion.div>
  )
}

export default Header
