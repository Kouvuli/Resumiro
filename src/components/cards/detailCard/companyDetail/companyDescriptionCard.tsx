import React from 'react'
import {
    Card,
    CardHeader,
    Typography,
    CardContent,
    Stack,
    Divider
} from '@mui/material'
const CompanyDescriptionCard = () => {
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
                        Công ty chưa thêm phần này
                    </Typography>

                    <Typography variant="h5">Địa chỉ văn phòng</Typography>
                    <Divider flexItem style={{ height: '100%' }} />

                    <Typography variant="body1">
                        364 Cộng Hòa, Phường 13, Quận Tân Bình, Thành phố Hồ Chí
                        Minh
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CompanyDescriptionCard
