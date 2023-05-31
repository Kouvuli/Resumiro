import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'
import ArticleLayout from '@components/layouts/article'
const NotFoundPage = () => {
  return (
    <ArticleLayout title="Không tìm thấy trang">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 500,
          margin: '20px auto 100px',
          alignItems: 'center'
        }}
      >
        <Image
          src="/images/404.gif"
          height="450"
          width="450"
          alt="data-not-found"
        />

        <Button
          color="primary"
          href="/"
          variant="contained"
          disableElevation
          disableRipple
          sx={{ p: '8px 16px', width: 200 }}
        >
          Trở về trang chủ
        </Button>
      </div>
    </ArticleLayout>
  )
}

export default NotFoundPage
