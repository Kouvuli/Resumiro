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

type CompanyListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: CompanyCardProps[]
}
interface CompanyPageProps {
  data: CompanyListPerPage
}
// const companyList: CompanyListPerPage = {
//   perPage: 4,
//   page: 1,
//   totalPage: 10,
//   data: [
//     {
//       id: 1,
//       logo: '/images/Images_1.png',
//       companyName: 'DXC Technology Vietnam',
//       location: 'Ho Chi Minh City, Vietnam',
//       scale: '1001-5000 nhân viên',
//       hiringNumber: 3
//     },
//     {
//       id: 2,
//       logo: '/images/Images_1.png',
//       companyName: 'DXC Technology Vietnam',
//       location: 'Ho Chi Minh City, Vietnam',
//       scale: '1001-5000 nhân viên',
//       hiringNumber: 3
//     },
//     {
//       id: 3,
//       logo: '/images/Images_1.png',
//       companyName: 'DXC Technology Vietnam',
//       location: 'Ho Chi Minh City, Vietnam',
//       scale: '1001-5000 nhân viên',
//       hiringNumber: 3
//     },
//     {
//       id: 4,
//       logo: '/images/Images_1.png',
//       companyName: 'DXC Technology Vietnam',
//       location: 'Ho Chi Minh City, Vietnam',
//       scale: '1001-5000 nhân viên',
//       hiringNumber: 3
//     }
//   ]
// }

const CompanyPage: React.FC<CompanyPageProps> = ({ data }) => {
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
          <SearchBar />
          <SearchResultBar />
          {data.data.map((company, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <CompanyCard {...company} />
            </Grid>
          ))}

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
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps() {
  const companies = await resumiroApi
    .getCompanies({ page: 1, limit: 7 })
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
