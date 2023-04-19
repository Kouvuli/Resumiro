import Container from '@mui/material/Container'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import ResumeGrid from '@components/grid/resumeGrid'
import SuitableJob from '@components/lists/suitableJob'
import ArticleLayout from '@components/layouts/article'
import { ResumeCardProps } from '@components/cards/resumeCard'
import { JobCardProps } from '@components/cards/jobCard'
import resumiroApi from '@apis/resumiroApi'
import { Job, Resume } from '@shared/interfaces'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Modal, Box, Button, CircularProgress, TextField } from '@mui/material'
import resumeSlice, {
  createResume,
  uploadResume
} from '@redux/reducers/resumeSlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { resumeSelector } from '@redux/selectors'
import MySnackBar from '@components/ui/bar/snackbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
type ResumeListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: ResumeCardProps[]
}

interface ResumePageProps {
  resumeList: ResumeListPerPage
  suitableList: JobCardProps[]
}

const ResumePage: React.FC<ResumePageProps> = ({
  resumeList,
  suitableList
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const {
    uploadLoading,
    showMessage,
    message,
    messageType,
    loading,
    uploadedResume
  } = useAppSelector(resumeSelector)
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    dispatch(resumeSlice.actions.reset())
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false)
  const addResumeHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get('title')!
    if (title === '' || uploadedResume === '') {
      dispatch(
        resumeSlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(resumeSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    dispatch(
      createResume({
        title,
        resume: uploadedResume,
        owner_id: Number(session!.user!.name!)
      })
    )
    router.push({
      pathname: router.pathname
    })
    setOpenModal(false)
  }

  const resumeUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]
    console.log(data)
    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(uploadResume(body))
    }
  }
  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(resumeSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Hồ sơ - CV">
      <MySnackBar
        handleClose={handleSnackBarClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          component="form"
          noValidate
          onSubmit={addResumeHandler}
          sx={{
            borderRadius: '5px',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                disableElevation
                disableFocusRipple
                endIcon={
                  uploadLoading && (
                    <CircularProgress color="secondary" size={18} />
                  )
                }
              >
                Tải CV
                <input
                  hidden
                  onChange={resumeUploadHandler}
                  accept="application/pdf"
                  type="file"
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '1rem'
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  disableRipple
                  color="primary"
                  onClick={handleCloseModal}
                  sx={{
                    mr: 1,
                    p: 1.5,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  type="submit"
                  disableElevation
                  disableRipple
                  variant="contained"
                  color="secondary"
                  endIcon={loading && <CircularProgress size={18} />}
                  sx={{
                    p: 1.5,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  OK
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem">
          <Grid item xs={12} md={7.5}>
            <ResumeGrid {...resumeList} title="CV đã tải lên" />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <SuitableJob
              openHandler={handleOpenModal}
              isResumePage
              items={suitableList}
              title="Danh sách công việc phù hợp"
            />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { req: any; res: any }) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }
  if (session?.user?.email === 'recruiter') {
    return {
      redirect: {
        destination: '/ho-so-cv',
        permanent: false
      }
    }
  }
  const data1 = await resumiroApi
    .getCandidateById(session!.user!.name!)
    .then(res => res.data)

  const convertData = data1.data.resumes.map((item: Resume) => {
    return {
      id: item.id,
      resumeTitle: item.title,
      data: item.data,
      createAt: item.create_at
    }
  })

  const data2 = await resumiroApi
    .getJobs({ page: 1, limit: 7 })
    .then(res => res.data)
  const suitableList = data2.data.map((job: Job) => {
    return {
      id: job.id,
      logo: job.company.logo,
      jobTitle: job.title,
      companyName: job.company.name,
      location: job.location,
      salary: job.salary,
      experience: job.experience,
      createAt: job.create_at
    }
  })
  return {
    props: {
      resumeList: {
        page: null,
        totalPages: null,
        perPage: null,
        data: convertData
      },
      suitableList: suitableList
    }
  }
}

export default ResumePage
