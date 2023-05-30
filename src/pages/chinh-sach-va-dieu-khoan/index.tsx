import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { Link } from '@mui/material'
import ArticleLayout from '@components/layouts/article'

const sectionTitleStyle = {
  marginTop: '16px',
  marginBottom: '8px',
  fontSize: '25px'
}

const paragraphStyle = {
  marginBottom: '16px'
}

const Hr = styled('hr')(({ theme }) => ({
  marginTop: '20px',
  marginBottom: '20px',
  border: 0,
  borderTop: '1px solid #eee'
}))

const Heading = styled('span')(({ theme }) => ({
  marginLeft: '20px'
}))

const List = styled('li')(({ theme }) => ({
  marginLeft: '40px'
}))

const Main = styled('main')(({ theme }) => ({
  margin: 'auto',
  paddingBottom: '20px'
}))

const PrivacyPolicyPage = () => {
  return (
    <ArticleLayout title="Điều khoản và chính sách">
      <div style={{ background: '#F0F0F0', padding: '2% 0' }}>
        <Container style={{ margin: 'auto', background: '#FFFFFF' }}>
          <Main>
            <Typography
              variant="h3"
              gutterBottom
              style={{ paddingTop: '20px' }}
            >
              Chính sách bảo mật và điều khoản
            </Typography>
            <Hr />
            <Typography variant="h5" style={sectionTitleStyle}>
              I. Chính sách bảo mật
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>1. Bảo mật thông tin cá nhân:</Heading>
              <br />
              <List>
                - Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng và
                tuân thủ các quy định liên quan đến bảo vệ dữ liệu cá nhân.
              </List>
              <br />
              <List>
                - Các thông tin cá nhân như tên, địa chỉ email, số điện thoại và
                hồ sơ cá nhân sẽ chỉ được sử dụng để cung cấp dịch vụ và tương
                tác với người dùng.
              </List>
              <br />
              <List>
                - Chúng tôi không chia sẻ thông tin cá nhân của người dùng với
                bất kỳ bên thứ ba nào mà không có sự đồng ý rõ ràng từ người
                dùng.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>2. Quyền riêng tư của người dùng:</Heading>
              <br />
              <List>
                - Người dùng có quyền kiểm soát thông tin cá nhân của mình và có
                thể chỉnh sửa, cập nhật hoặc xóa thông tin đó từ tài khoản của
                mình.
              </List>
              <br />
              <List>
                - Chúng tôi sẽ tiến hành các biện pháp bảo mật phù hợp để bảo vệ
                thông tin cá nhân của người dùng khỏi việc truy cập trái phép,
                mất mát hoặc sử dụng sai mục đích.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>3. Sử dụng cookie:</Heading>
              <br />
              <List>
                - Chúng tôi có thể sử dụng cookie để cung cấp trải nghiệm tốt
                hơn cho người dùng.
              </List>
              <br />
              <List>
                - Cookie là các tệp nhỏ được lưu trữ trên máy tính của người
                dùng và chứa thông tin về hoạt động trên trang web của chúng
                tôi.
              </List>
              <br />
              <List>
                - Người dùng có quyền tắt chức năng cookie trên trình duyệt nếu
                muốn.
              </List>
            </Typography>

            <Typography variant="h5" style={sectionTitleStyle}>
              II. Điều khoản sử dụng
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>1. Tạo tài khoản:</Heading>
              <br />
              <List>
                - Người dùng phải đủ 18 tuổi trở lên để tạo tài khoản trên trang
                web của chúng tôi.
              </List>
              <br />
              <List>
                - Mọi thông tin cung cấp trong quá trình đăng ký tài khoản phải
                chính xác và cập nhật.
              </List>
              <br />
              <List>- Mỗi người dùng chỉ được phép tạo một tài khoản.</List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>2. Chia sẻ CV và thông tin tuyển dụng:</Heading>
              <br />
              <List>
                - Người dùng có thể chia sẻ CV của mình để giới thiệu quá trình
                học tập và kỹ năng cá nhân.
              </List>
              <br />
              <List>- CV phải được đảm bảo chính xác, đầy đủ và cập nhật.</List>
              <br />
              <List>
                - Chúng tôi khuyến nghị người dùng tôn trọng quyền riêng tư và
                không bao gồm thông tin cá nhân nhạy cảm, chẳng hạn như số CMND
                hoặc thông tin liên hệ.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>3. Quyền và trách nhiệm của người dùng:</Heading>
              <br />
              <List>
                - Người dùng phải tuân thủ các quy định về việc sử dụng trang
                web và không được thực hiện bất kỳ hành vi vi phạm pháp luật
                hoặc gây ảnh hưởng xấu đến người khác.
              </List>
              <br />
              <List>
                - Mọi thông tin và nội dung chia sẻ trên trang web phải tuân thủ
                các quy định bản quyền và không vi phạm quyền sở hữu trí tuệ của
                người khác.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>4. Phản ánh và xử lý vi phạm:</Heading>
              <br />
              <List>
                - Người dùng có thể báo cáo bất kỳ vi phạm nào về chính sách và
                quy định của trang web cho đội hỗ trợ của chúng tôi qua kênh
                liên hệ đã được chỉ định.
              </List>
              <br />
              <List>
                - Trang web có quyền áp dụng các biện pháp phù hợp, bao gồm cả
                cảnh cáo, tạm ngừng tài khoản tạm thời hoặc cấm vĩnh viễn đối
                với những người dùng vi phạm chính sách và quy định.
              </List>
              <br />
              <List>
                - Trong trường hợp vi phạm luật pháp, trang web có thể báo cáo
                hoạt động của người dùng cho cơ quan có thẩm quyền.
              </List>
            </Typography>

            <Typography variant="h5" style={sectionTitleStyle}>
              III. Quyền sở hữu trí tuệ
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>1. Bản quyền:</Heading>
              <br />
              <List>
                - Mọi quyền sở hữu trí tuệ, bao gồm bản quyền, thương hiệu và
                quyền tác giả, liên quan đến nội dung và thiết kế trang web
                Resumiro đều thuộc quyền sở hữu của chúng tôi hoặc các bên sở
                hữu tương ứng.
              </List>
              <br />
              <List>
                - Người dùng không được sao chép, tái bản, sửa đổi hoặc phân
                phối nội dung trang web mà không có sự cho phép rõ ràng từ chúng
                tôi hoặc chủ sở hữu tương ứng.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>2. Quyền sở hữu nội dung:</Heading>
              <br />
              <List>
                - Người dùng giữ quyền sở hữu đối với nội dung mà họ chia sẻ
                trên trang web Resumiro.
              </List>
              <br />
              <List>
                - Bằng cách chia sẻ nội dung trên trang web, người dùng đồng ý
                cấp phép cho chúng tôi một quyền không độc quyền, miễn phí, toàn
                cầu và không thể chuyển nhượng để sử dụng, sao chép, trưng bày,
                công bố và phân phối nội dung đó cho mục đích vận hành và quảng
                cáo trang web Resumiro.
              </List>
            </Typography>

            <Typography variant="h5" style={sectionTitleStyle}>
              IV. Miễn trừ trách nhiệm
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>1. Tính chính xác của thông tin:</Heading>
              <br />
              <List>
                - Chúng tôi cố gắng đảm bảo rằng thông tin được cung cấp trên
                trang web Resumiro là chính xác và cập nhật.
              </List>
              <br />
              <List>
                - Tuy nhiên, chúng tôi không chịu trách nhiệm đối với bất kỳ
                thiếu chính xác, lỗi sót hoặc mất mát nào liên quan đến thông
                tin được cung cấp bởi người dùng hoặc bên thứ ba.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>2. Truy cập và sử dụng trang web:</Heading>
              <br />
              <List>
                - Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại nào
                phát sinh từ việc truy cập hoặc sử dụng trang web Resumiro, bao
                gồm nhưng không giới hạn, thiệt hại trực tiếp, gián tiếp, ngẫu
                nhiên hoặc hậu quả.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <Heading>3. Liên kết đến bên thứ ba:</Heading>
              <br />
              <List>
                - Trang web Resumiro có thể chứa liên kết đến các trang web của
                bên thứ ba
              </List>
              <br />
              <List>
                - Chúng tôi không kiểm soát hoặc chịu trách nhiệm đối với nội
                dung, chính sách bảo mật hoặc hoạt động của bất kỳ trang web bên
                thứ ba nào.
              </List>
            </Typography>

            <Typography variant="h5" style={sectionTitleStyle}>
              V. Liên hệ
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <div style={{ marginLeft: '20px' }}>
                Nếu bạn có bất kỳ câu hỏi, ý kiến hoặc yêu cầu liên quan đến
                chính sách bảo mật và điều khoản sử dụng trang web Resumiro, vui
                lòng liên hệ với chúng tôi theo thông tin sau:
              </div>
              <br />
              <List>
                - Email:{' '}
                <Link href="mailto:webresumiro@gmail.com">
                  webresumiro@gmail.com
                </Link>
              </List>
              <br />
              <div style={{ marginLeft: '20px' }}>
                Chúng tôi sẽ cố gắng phản hồi cho bạn trong thời gian ngắn và
                giải đáp mọi thắc mắc của bạn.
              </div>
            </Typography>

            <Typography variant="h5" style={sectionTitleStyle}>
              VI. Thay đổi chính sách và quy định
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              <List>
                - Chúng tôi có quyền điều chỉnh và cập nhật chính sách bảo mật
                và quy định sử dụng theo quyết định của chúng tôi.
              </List>
              <br />
              <List>
                - Mọi thay đổi sẽ được thông báo trên trang web hoặc thông qua
                email để người dùng có thể nắm bắt và đồng ý với các điều khoản
                mới.
              </List>
            </Typography>
            <Typography variant="body1" style={paragraphStyle}>
              Chúng tôi mong rằng các chính sách bảo mật và điều khoản sử dụng
              trên trang web Resumiro sẽ giúp đảm bảo sự an toàn và bảo vệ thông
              tin cá nhân của người dùng. Sử dụng trang web của chúng tôi đồng
              nghĩa với việc người dùng chấp nhận và tuân thủ các chính sách và
              điều khoản này. Chúng tôi xin chân thành cảm ơn và chúc bạn có
              những trải nghiệm tốt nhất trên Resumiro!
              <br />
            </Typography>
          </Main>
        </Container>
      </div>
    </ArticleLayout>
  )
}

export default PrivacyPolicyPage
