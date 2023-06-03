import React from 'react'
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
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authRequestSelector } from '@redux/selectors'
import authRequestSlice from '@redux/reducers/authRequestSlice'
import AuthRequestCard from '@components/cards/authRequestCard'
import resumiroApi from '@apis/resumiroApi'
import _ from 'lodash'
import { Request } from '@shared/interfaces'
type RequestListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: Request[]
}
interface AuthenRequestPageProps {
  data: RequestListPerPage
}
const AuthenRequestPage: React.FC<AuthenRequestPageProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    showMessage,
    message,
    messageType,

    page,
    limit,

    q
  } = useAppSelector(authRequestSelector)
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
    event?: React.SyntheticEvent | Event,
    reason?: string
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
          <SearchResultBar numberSearch={data.data.length} />
          {!_.isEmpty(data.data) ? (
            data.data.map((request, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <AuthRequestCard request={request} />
              </Grid>
            ))
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

  const requests = await resumiroApi
    .getRequestsByReceiverId(Number(session?.user?.id), context.query)
    .then(res => res.data)

  return {
    props: {
      session: session,
      data: {
        perPage: requests.pagination.limit,
        page: requests.pagination.page,
        totalPage: requests.pagination.total,
        data: requests.data
      }
    }
  }
}

export default AuthenRequestPage
