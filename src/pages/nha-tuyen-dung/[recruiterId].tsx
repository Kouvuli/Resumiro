import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import BasicInfoCard from '@components/cards/profileCard/basicInfoCard'
import BackgroundCard from '@components/cards/profileCard/backgroundCard'
import ImagesCard from '@components/cards/profileCard/imagesCard'
import ArticleLayout from '@components/layouts/article'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import CompanyBasicCard from '@components/cards/profileCard/companyBasicCard'
import resumiroApi from '@apis/resumiroApi'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { recruiterProfileSelector } from '@redux/selectors'
import { fetchRecruiterById } from '@redux/reducers/recruiterProfileSlice'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
interface RecruiterProfilePageProps {}

const RecruiterProfilePage: React.FC<RecruiterProfilePageProps> = ({}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, message, messageType, showMessage } = useAppSelector(
    recruiterProfileSelector
  )
  useEffect(() => {
    if (session) {
      const recruiterId = Array.isArray(router.query!.recruiterId!)
        ? router.query!.recruiterId![0]
        : router.query!.recruiterId!
      dispatch(fetchRecruiterById(recruiterId))
    }
  }, [])
  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <ArticleLayout title={`Trang cá nhân của ${user.username}`}>
        <Container
          sx={{
            paddingTop: '2rem ',
            paddingBottom: '5rem'
          }}
        >
          <Grid container columnSpacing={{ md: 2, xs: 0 }}>
            <Grid item xs={12}>
              <BackgroundCard src={user.background} alt={user.full_name} />
            </Grid>
            <Grid item xs={12} md={8}>
              <BasicInfoCard
                type={2}
                avatar={user.avatar}
                fullName={user.full_name}
                username={user.username}
                role={user.role}
                phone={user.phone}
                background={user.background}
                email={user.email}
              />

              {user.company && (
                <CompanyBasicCard
                  type={2}
                  style={{ marginTop: '16px' }}
                  company={user.company}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4} marginTop={{ xs: '16px', md: '0px' }}>
              <ImagesCard />
            </Grid>
          </Grid>
        </Container>
      </ArticleLayout>
    </div>
  )
}

export async function getServerSideProps(context: {
  req: any
  res: any
  query: any
}) {
  const { recruiterId } = context.query
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }

  if (session.user!.role === 'recruiter') {
    return {
      notFound: true
    }
  }
  const recruiterDetail = await resumiroApi
    .getRecruiterById(recruiterId)
    .then(res => res.data)

  return {
    props: {
      session: session,
      user: recruiterDetail.data
    }
  }
}

export default RecruiterProfilePage
