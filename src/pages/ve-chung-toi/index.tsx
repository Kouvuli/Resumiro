import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { styled } from '@mui/material/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArticleLayout from '@components/layouts/article'

const teamMembers = [
  {
    name: 'Nguyễn Minh Phụng',
    role: 'Leader',
    image: '/images/Blog_1.png',
    details:
      'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
  },
  {
    name: 'Lê Đức Tâm',
    role: 'Developer',
    image: '/images/Blog_1.png',
    details:
      'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
  },
  {
    name: 'Mạch Vi Phong',
    role: 'Developer',
    image: '/images/Blog_1.png',
    details:
      'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
  },
  {
    name: 'Nguyễn Quang Định',
    role: 'Developer',
    image: '/images/Blog_1.png',
    details:
      'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
  },
  {
    name: 'Nguyễn Bá Ngọc',
    role: 'Developer',
    image: '/images/Blog_1.png',
    details:
      'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
  }
]

const Container = styled('div')(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px'
}))

const Title = styled('li')(({ theme }) => ({
  textAlign: 'center',

  fontSize: '30px',
  fontWeight: 'bold',
  marginBottom: '20px'
}))

const CarouselContainer = styled('li')(({ theme }) => ({
  marginBottom: '30px'
}))

const MemberContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px'
}))

const MemberImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  marginRottom: '10px'
}))

const TeamImage = styled('img')(({ theme }) => ({
  borderRadius: '5%',
  marginBottom: '10px',
  magin: 'auto',
  height: '100%',
  width: '100%'
}))

const MemberName = styled('h2')(({ theme }) => ({
  paddingTop: '10px',
  paddingBottom: '5px',
  fontSize: '25px',
  fontWeight: 'bold',
  marginBottom: '5px'
}))

const MemberRole = styled('p')(({ theme }) => ({
  fontSize: '20px',
  paddingBottom: '5px',
  color: '#999999',
  marginBottom: '10px'
}))

const MemberDetails = styled('div')(({ theme }) => ({
  marginTop: '20px',
  paddingBottom: '5px'
}))

const MemberDetailsTitle = styled('h3')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px'
}))

const MemberDetailsText = styled('p')(({ theme }) => ({
  fontSize: '18px',
  color: '#666666',
  marginBottom: '5px',
  lineHeight: '1.4'
}))

const CustomeIndicatorSelected = styled('li')(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '50%',
  width: '8px',
  height: '8px',
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 8px',
  transition: 'opacity .25s ease-in'
}))

const CustomeIndicator = styled('li')(({ theme }) => ({
  background: 'white',
  borderRadius: '50%',
  width: '8px',
  height: '8px',
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 8px',
  transition: 'opacity .25s ease-in',
  border: '1px solid',
  opacity: '0.2'
}))

const AboutUs: React.FC = () => {
  const [currentMember, setCurrentMember] = useState(0)

  const teamMembers = [
    {
      name: 'Nguyễn Minh Phụng',
      role: 'Leader',
      image: '/images/Blog_1.png',
      details:
        'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
    },
    {
      name: 'Lê Đức Tâm',
      role: 'Developer',
      image: '/images/Blog_2.png',
      details:
        'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
    },
    {
      name: 'Mạch Vi Phong',
      role: 'Developer',
      image: '/images/Blog_3.png',
      details:
        'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
    },
    {
      name: 'Nguyễn Quang Định',
      role: 'Developer',
      image: '/images/Blog_1.png',
      details:
        'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
    },
    {
      name: 'Nguyễn Bá Ngọc',
      role: 'Developer',
      image: '/images/Blog_2.png',
      details:
        'CKO is a skilled developer with expertise in front-end technologies. She enjoys building user-friendly and intuitive interfaces.'
    }
  ]

  const handleCarouselChange = (index: number) => {
    setCurrentMember(index)
  }

  return (
    <ArticleLayout title="Về chúng tôi">
      <Container>
        <section className="Thông tin nhóm">
          <Title>Thông tin nhóm</Title>
          <TeamImage src="./images/Blog_3.png" alt="Hình chụp nhóm" />
          <MemberDetails>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Tên nhóm:</span> Anh em Cây
              Khế
            </MemberDetailsText>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Vai trò:</span>{' '}
              {teamMembers[currentMember].role}
            </MemberDetailsText>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Thông tin thêm:</span>{' '}
              {teamMembers[currentMember].details}
            </MemberDetailsText>
          </MemberDetails>
        </section>
        <section className="Thông tin thành viên" style={{ marginTop: 100 }}>
          <Title>Về chúng tôi</Title>
          <CarouselContainer>
            <Carousel
              showArrows={true}
              showThumbs={false}
              selectedItem={currentMember}
              onChange={handleCarouselChange}
              showStatus={false}
              swipeScrollTolerance={100}
              renderArrowPrev={(
                onClickHandler:
                  | React.MouseEventHandler<SVGSVGElement>
                  | undefined,
                hasPrev: any,
                label: any
              ) =>
                hasPrev && (
                  // <PrevButton onClick={onClickHandler} title={label}>
                  //   Previous
                  // </PrevButton>
                  <ArrowBackIosIcon
                    onClick={onClickHandler}
                    // title={label}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '40%',
                      zIndex: 2
                    }}
                  />
                )
              }
              renderArrowNext={(
                onClickHandler:
                  | React.MouseEventHandler<SVGSVGElement>
                  | undefined,
                hasNext: any,
                label: any
              ) =>
                hasNext && (
                  // <NextButton onClick={onClickHandler} title={label}>
                  //   Next
                  // </NextButton>
                  <ArrowForwardIosIcon
                    onClick={onClickHandler}
                    // title={label}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '40%',
                      zIndex: 2
                    }}
                  />
                )
              }
              renderIndicator={(
                onClickHandler:
                  | React.MouseEventHandler<HTMLLIElement>
                  | undefined,
                isSelected: any,
                index: any,
                label: any
              ) => {
                return isSelected ? (
                  <CustomeIndicatorSelected onClick={onClickHandler} />
                ) : (
                  <CustomeIndicator onClick={onClickHandler} />
                )
              }}
            >
              {teamMembers.map((member, index) => (
                <MemberContainer key={index}>
                  <MemberImage src={member.image} alt={member.name} />
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                </MemberContainer>
              ))}
            </Carousel>
          </CarouselContainer>
          <MemberDetails>
            <MemberDetailsTitle>Member Details</MemberDetailsTitle>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Họ và tên:</span>{' '}
              {teamMembers[currentMember].name}
            </MemberDetailsText>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Vai trò:</span>{' '}
              {teamMembers[currentMember].role}
            </MemberDetailsText>
            <MemberDetailsText>
              <span style={{ fontWeight: 'bold' }}>Thông tin thêm:</span>{' '}
              {teamMembers[currentMember].details}
            </MemberDetailsText>
          </MemberDetails>
        </section>
      </Container>
    </ArticleLayout>
  )
}

export default AboutUs
