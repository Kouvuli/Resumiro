import Container from '@mui/material/Container'
import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import ResumeGrid from '@components/grid/resumeGrid'
import ArticleLayout from '@components/layouts/article'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import SearchBar from '@components/ui/bar/searchBar'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import Image from 'next/image'
import Filter from '@components/lists/filter'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import resumeSlice, { getResumes } from '@redux/reducers/resumeSlice'
import { resumeSelector } from '@redux/selectors'
import { useRouter } from 'next/router'
import _ from 'lodash'
import MySnackBar from '@components/ui/bar/snackbar'

interface ResumeRecruiterPageProps {}

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

const ResumeRecruiterPage: React.FC<ResumeRecruiterPageProps> = ({}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    page,
    limit,
    skill,
    q,
    order_by,
    showMessage,
    message,
    messageType,
    allResumes
  } = useAppSelector(resumeSelector)

  useEffect(() => {
    dispatch(getResumes(router.query))
  }, [router.query])
  const searchHandler = () => {
    let query: any = {}
    if (!page) {
      query.page = 1
    }
    if (!limit) {
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
    _event?: React.SyntheticEvent | Event,
    _reason?: string
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

          {allResumes.data && (
            <SearchResultBar
              options={orderOptions}
              numberSearch={allResumes.data.length}
              handleChange={handleJobOrderChange}
            />
          )}

          <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
            <Filter type={2} />
          </Grid>
          <Grid item xs={12} md={9}>
            {!_.isEmpty(allResumes.data) ? (
              <ResumeGrid {...allResumes} type={2} />
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
  if (session.user!.role === 'candidate') {
    return {
      redirect: {
        destination: '/ho-so-cv/ung-vien',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default ResumeRecruiterPage
