import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface AboutUsCardProps {
  children?: React.ReactNode
}

const GridItem = styled(Grid)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  // flexDirection: 'column',
  color: theme.palette.text.secondary
}))

const AboutUsCard: React.FC<AboutUsCardProps> = ({}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <GridItem item xs={12} md={7}>
        <video style={{ borderRadius: '5px' }} width="100%" controls>
          <source src="/videos/introduction.mp4" type="video/mp4" />
        </video>
      </GridItem>
      <GridItem item xs={12} md={5}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">
              Người tìm việc và nhà tuyển dụng, họ vẫn đang phải đối mặt với
              những thách thức trong quy trình xin việc truyền thống. Những
              người tìm việc thường gặp khó khăn trong việc tìm kiếm cơ hội việc
              làm phù hợp và nổi bật so với đối thủ cạnh tranh với hồ sơ của họ.
              Mặt khác, các nhà tuyển dụng gặp khó khăn trong việc lọc qua một
              lượng lớn hồ sơ và xác định những ứng viên đủ điều kiện nhất. Quá
              trình chuyển giao sơ yếu lý lịch và đơn xin việc hiện tại tốn
              nhiều thời gian, không hiệu quả và thiếu tính minh bạch. Những
              người tìm việc dành vô số thời gian để điều chỉnh sơ yếu lý lịch
              của họ cho phù hợp với từng công việc họ ứng tuyển và sau đó phải
              theo dõi các phiên bản khác nhau mà họ đã gửi đi. Các nhà tuyển
              dụng bị choáng ngợp bởi số lượng hồ sơ họ nhận được và phải vật
              lộn để nhanh chóng tìm được ứng viên phù hợp. Từ những vấn đề đã
              đề cập, giải pháp nhóm đề xuất là một nền tảng chia sẻ sơ yếu lý
              lịch hỗ trợ quy trình tuyển dụng việc làm. Là nền tảng giúp người
              dùng quản lý dễ dàng hơn các sơ yếu lý lịch của mình cũng như kết
              nối họ đến những nhà tuyển dụng với những công việc phù hợp nhu
              cầu và khả năng. Với những kiến thức về căn bản an toàn thông tin
              và lập trình blockchain đã được học tại trường, nhóm ứng dụng công
              nghệ blockchain để tiếp cận giải pháp trên{' '}
            </Typography>
          </CardContent>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default AboutUsCard
