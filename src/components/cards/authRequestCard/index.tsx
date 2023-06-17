import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { Button, CardHeader } from '@mui/material'

import Link from 'next/link'
import { Request } from '@shared/interfaces'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { certificates, experiences } from '@prisma/client'
import {
  updateCertifcateStatus,
  updateExperienceStatus
} from '@redux/reducers/authRequestSlice'
import Resumiro from '../../../interfaces/Resumiro'
import { Wallet } from '@redux/reducers/web3Slice'
import { web3Selector } from '@redux/selectors'

export interface AuthRequestCardProps {
  request: Request
}

const CustomAuthRequestCard = styled(Card)(({}) => ({
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.25)',

  borderRadius: '3%',
  '& .MuiPaper-root': {
    boxShadow: 'unset'
  }
}))

const authRequestCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: '20px'
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const AuthRequestCard: React.FC<AuthRequestCardProps> = ({ request }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { resumiro, wallet }: { resumiro: Resumiro; wallet: Wallet } =
    useAppSelector(web3Selector)
  const handleAcceptCertificate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: certificates | null
  ) => {
    await resumiro.changeCertificateStatus(data!.id, 1)
    dispatch(
      updateCertifcateStatus({
        id: data!.id,
        data: { status: 'verified' },
        requestId: request.id,
        router: router
      })
    )

    router.push({
      pathname: router.pathname
    })
  }

  const handleAcceptExperience = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: experiences | null
  ) => {
    await resumiro.changeExpStatus(data!.id, 1)
    dispatch(
      updateExperienceStatus({
        id: data!.id,
        data: { status: 'verified' },
        requestId: request.id,
        router: router
      })
    )

    router.push({
      pathname: router.pathname
    })
  }

  const handleRejectExperience = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: experiences | null
  ) => {
    await resumiro.changeExpStatus(data!.id, 2)
    dispatch(
      updateExperienceStatus({
        id: data!.id,
        data: { status: 'rejected' },
        requestId: request.id,
        router: router
      })
    )

    router.push({
      pathname: router.pathname
    })
  }

  const handleRejectCertificate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: null | certificates
  ) => {
    await resumiro.changeCertificateStatus(data!.id, 2)
    dispatch(
      updateCertifcateStatus({
        id: data!.id,
        data: { status: 'rejected' },
        requestId: request.id,
        router: router
      })
    )

    router.push({
      pathname: router.pathname
    })
  }
  return (
    <motion.div
      variants={authRequestCardVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        duration: 0.5
        // delay: index * 0.2
      }}
    >
      <CustomAuthRequestCard>
        <CardHeader
          sx={{
            alignItems: 'start',
            padding: '24px 24px 12px 24px'
          }}
          title={
            <Typography
              variant="h5"
              sx={{ textTransform: 'capitalize', pb: 0.5 }}
            >
              {request.content}
            </Typography>
          }
          subheader={
            <Link href={`/ung-vien/${request.owner.id}`}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.disabled',
                  textTransform: 'capitalize'
                }}
              >
                {request.owner.username}
              </Typography>
            </Link>
          }
        />
        <CardContent
          sx={{
            padding: '0 24px 24px 24px'
          }}
        >
          {request.certificate && (
            <ul style={{ listStyleType: 'none' }}>
              <Link href={request.certificate.source!}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'info.main' }}
                >
                  {request.certificate.name}
                </Typography>
              </Link>
              <li>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {new Date(
                    request.certificate.verified_at
                  ).toLocaleDateString()}
                </Typography>
              </li>
              <li>
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={e => handleAcceptCertificate(e, request.certificate)}
                  sx={{ mt: 1 }}
                >
                  Chấp nhận
                </Button>

                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  sx={{ mt: 1, ml: 1 }}
                  onClick={e => handleRejectCertificate(e, request.certificate)}
                >
                  Từ chối
                </Button>
              </li>
            </ul>
          )}

          {request.experience && (
            <ul style={{ listStyleType: 'none' }}>
              <Link href={request.experience.source!}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'info.main' }}
                >
                  {request.experience.position}
                </Typography>
              </Link>
              <li>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {request.experience.start} - {request.experience.finish}
                </Typography>
              </li>
              <li>
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={e => handleAcceptExperience(e, request.experience)}
                >
                  Chấp nhận
                </Button>

                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  onClick={e => handleRejectExperience(e, request.experience)}
                  sx={{ mt: 1, ml: 1 }}
                >
                  Từ chối
                </Button>
              </li>
            </ul>
          )}
        </CardContent>
      </CustomAuthRequestCard>
    </motion.div>
  )
}

export default AuthRequestCard
