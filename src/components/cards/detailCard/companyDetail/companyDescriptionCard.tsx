import React from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Stack,
  Divider
} from '@mui/material'

interface CompanyDescriptionCardProps {
  address: string | null
  introduction: string | null
}

const CompanyDescriptionCard: React.FC<CompanyDescriptionCardProps> = ({
  address,
  introduction
}) => {
  return (
    <Card>
      <CardHeader
        sx={{ p: 3 }}
        title={
          <Typography
            variant="h5"
            color="text.primary"
            sx={{
              fontSize: '20px',
              textTransform: 'capitalize'
            }}
          >
            Thông tin công ty
          </Typography>
        }
      />
      <CardContent sx={{ p: '0 24px 24px 24px' }}>
        <Stack spacing={2}>
          <Typography variant="h5">Giới thiệu</Typography>
          <Divider />
          <Typography variant="body1">
            {introduction ? introduction : 'Công ty chưa thêm phần này'}
          </Typography>

          <Typography variant="h5">Địa chỉ văn phòng</Typography>
          <Divider flexItem style={{ height: '100%' }} />

          <Typography variant="body1">
            {address ? address : 'Công ty chưa thêm phần này'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CompanyDescriptionCard
