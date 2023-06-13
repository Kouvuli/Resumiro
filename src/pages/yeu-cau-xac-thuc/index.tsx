import React, { useEffect } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import ArticleLayout from '@components/layouts/article'
import MySnackBar from '@components/ui/bar/snackbar'
import { Container, Grid } from '@mui/material'
import SearchBar from '@components/ui/bar/searchBar'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import Image from 'next/image'
import RoundPagination from '@components/ui/pagination/roundPagination'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useRouter } from 'next/router'
import { authRequestSelector } from '@redux/selectors'
import authRequestSlice, {
  getAuthRequests
} from '@redux/reducers/authRequestSlice'
import AuthRequestCard from '@components/cards/authRequestCard'
import _ from 'lodash'
import { Request } from '@shared/interfaces'
import { useSession } from 'next-auth/react'

interface AuthenRequestPageProps {}
const AuthenRequestPage: React.FC<AuthenRequestPageProps> = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    showMessage,
    message,
    messageType,
    data,
    page,
    limit,

    q
  } = useAppSelector(authRequestSelector)
  const { data: session } = useSession()
  useEffect(() => {
    dispatch(
      getAuthRequests({ userId: session!.user!.id, query: router.query })
    )
  }, [router.query])

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

    router.push({
      pathname: router.pathname,
      query: query
    })
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(authRequestSlice.actions.changeSearchText(e.target.value))
  }
  const handleSnackBarClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    dispatch(authRequestSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Yêu cầu xác thực">
      <MySnackBar
        handleClose={handleSnackBarClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
      <Container>
        <Grid
          container
          marginTop="1rem "
          marginBottom="5rem"
          rowSpacing={2}
          columnSpacing={3}
        >
          <SearchBar
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
            hasLocationSelect={false}
            hasAddCompany={false}
          />
          {data.data && <SearchResultBar numberSearch={data.data.length} />}
          {!_.isEmpty(data.data) ? (
            data.data.map(
              (request: Request, index: React.Key | null | undefined) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <AuthRequestCard request={request} />
                </Grid>
              )
            )
          ) : (
            <Image
              style={{ display: 'flex', margin: 'auto' }}
              src="/images/no-data-found.gif"
              height="450"
              width="450"
              alt="data-not-found"
            />
          )}

          <Grid
            item
            xs={12}
            sx={{
              justifyContent: 'center',
              display: 'flex',
              mt: 4
            }}
          >
            <RoundPagination
              page={Number(data.page)}
              totalPage={Number(data.totalPage)}
            />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: {
  req: any
  res: any
  query: any
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

  if (session.user!.role !== 'admin') {
    return {
      notFound: true
    }
  }

  return {
    props: {
      session: session
    }
  }
}

export default AuthenRequestPage
