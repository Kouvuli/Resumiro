import Container from '@mui/material/Container'
import React from 'react'
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
import SearchBar from '@components/ui/bar/searchBar'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import Image from 'next/image'
import Filter from '@components/lists/filter'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import resumeSlice from '@redux/reducers/resumeSlice'
import { jobSelector, resumeSelector } from '@redux/selectors'
import { useRouter } from 'next/router'
import _ from 'lodash'
import MySnackBar from '@components/ui/bar/snackbar'
type ResumeListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: ResumeCardProps[]
}

interface ResumeRecruiterPageProps {
  data: ResumeListPerPage
}

const orderOptions = [
  {
    value: 'create_at_desc',
    label: 'Mới nhất'
  },
  {
    value: 'create_at_asc',
    label: 'Cũ nhất'
  },
  {
    value: 'alphabet',
    label: 'A-Z'
  }
]

const ResumeRecruiterPage: React.FC<ResumeRecruiterPageProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { page, limit, skill, q, order_by, showMessage, message, messageType } =
    useAppSelector(resumeSelector)
  const searchHandler = () => {
    let query: any = {}
    if (page !== '') {
      query.page = 1
    }
    if (limit !== '') {
      query.limit = limit
    }
    if (q !== '') {
      query.q = q
    }
    if (skill !== '') {
      query.skill = skill
    }
    if (order_by !== '') {
      query.order_by = order_by
    }

    router.push({
      pathname: router.pathname,
      query: query
    })
  }

  const handleJobOrderChange = (value: string) => {
    dispatch(resumeSlice.actions.changeOrderBy(value))
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(resumeSlice.actions.changeSearchText(e.target.value))
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(resumeSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Hồ sơ - CV">
      <MySnackBar
        handleClose={handleClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem" rowSpacing={2}>
          <SearchBar
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
          />

          <SearchResultBar
            options={orderOptions}
            numberSearch={data.data.length}
            handleChange={handleJobOrderChange}
          />

          <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
            <Filter type={2} />
          </Grid>
          <Grid item xs={12} md={9}>
            {!_.isEmpty(data.data) ? (
              <ResumeGrid {...data} type={2} />
            ) : (
              <Image
                style={{ display: 'flex', margin: 'auto' }}
                src="/images/no-data-found.gif"
                height="450"
                width="450"
                alt="data-not-found"
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: {
  query: any
  req: any
  res: any
}) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }
  if (session?.user?.email === 'candidate') {
    return {
      redirect: {
        destination: '/ho-so-cv/ung-vien',
        permanent: false
      }
    }
  }
  const resumes = await resumiroApi.getResumes().then(res => res.data)

  const convertData = resumes.data.map((item: Resume) => {
    return {
      id: item.id,
      resumeTitle: item.title,
      data: item.data,
      createAt: item.create_at,
      owner: item.owner,
      isPublic: item.is_public,
      resumeKey: item.resume_key
    }
  })

  return {
    props: {
      data: {
        perPage: resumes.pagination.limit,
        page: resumes.pagination.page,
        totalPage: resumes.pagination.total,
        data: convertData
      }
    }
  }
}

export default ResumeRecruiterPage
