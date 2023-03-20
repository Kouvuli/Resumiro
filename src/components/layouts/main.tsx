import React from 'react'
import Box from '@mui/material/Box'
import { CssBaseline } from '@mui/material'
import Head from 'next/head'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

interface MainProps {
  children: React.ReactNode
  className?: string
}

const MainLayout: React.FC<MainProps> = ({ children }) => {
  return (
    <Box>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Home page</title>
      </Head>
      <Header />

      <CssBaseline />
      {children}
      <Footer />
    </Box>
  )
}

export default MainLayout
