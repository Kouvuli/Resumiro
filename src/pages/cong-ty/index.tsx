import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import CompanyCard, { CompanyCardProps } from '@components/cards/companyCard'
import RoundPagination from '@components/ui/pagination/roundPagination'
import ArticleLayout from '@components/layouts/article'
import resumiroApi from '@apis/resumiroApi'
import { Company } from '@shared/interfaces'
import companySlice from '@redux/reducers/companySlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useRouter } from 'next/router'
import { companySelector } from '@redux/selectors'
import Image from 'next/image'
import _ from 'lodash'
type CompanyListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: CompanyCardProps[]
}
interface CompanyPageProps {
  data: CompanyListPerPage
}

const orderOptions = [
  {
    value: 'alphabet',
    label: 'A-Z'
  }
]

const CompanyPage: React.FC<CompanyPageProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { page, limit, total, q, location, order_by } =
    useAppSelector(companySelector)
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
    if (location !== '') {
      query.location = location
    }
    if (order_by !== '') {
      query.order_by = order_by
    }

    router.push({
      pathname: router.pathname,
      query: query
    })
  }
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(companySlice.actions.changeSearchText(e.target.value))
  }

  const handleCompanyLocationChange = (value: string) => {
    dispatch(companySlice.actions.changeLocation(value))
  }
  const handleCompanyOrderChange = (value: string) => {
    dispatch(companySlice.actions.changeOrderBy(value))
  }
  return (
    <ArticleLayout title="Công ty">
      <Container>
        <Grid
          container
          marginTop="1rem "
          marginBottom="5rem"
          rowSpacing={2}
          columnSpacing={3}
        >
          <SearchBar
            handleChange={handleCompanyLocationChange}
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
          />
          <SearchResultBar
            numberSearch={data.data.length}
            handleChange={handleCompanyOrderChange}
            options={orderOptions}
          />
          {!_.isEmpty(data.data) ? (
            data.data.map((company, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <CompanyCard {...company} />
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

          {data.totalPage > 0 && (
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                mt: 4
              }}
            >
              <RoundPagination page={data.page} totalPage={data.totalPage} />
            </Grid>
          )}
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { query: any }) {
  const companies = await resumiroApi
    .getCompanies(context.query)
    .then(res => res.data)
  const companyList = companies.data.map((company: Company) => {
    return {
      id: company.id,
      logo: company.logo,
      companyName: company.name,
      location: company.location,
      scale: company.scale,
      hiringNumber: company.jobs.length
    }
  })
  return {
    props: {
      data: {
        perPage: companies.pagination.limit,
        page: companies.pagination.page,
        totalPage: companies.pagination.total,
        data: companyList
      }
    }
  }
}

export default CompanyPage
