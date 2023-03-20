import FeatureCard from '@components/cards/featureCard'
import FieldCard from '@components/cards/fieldCard'
import JobCard, { JobCardProps } from '@components/cards/jobCard'
import Slider from '@components/carousel/carousel'
import OutlinedButton from '@components/ui/button/outlinedButton'
import CustomerSupportIcon from '@components/ui/icons/customerSupportIcon'
import GuaranteeIcon from '@components/ui/icons/guaranteeIcon'
import ShieldIcon from '@components/ui/icons/shieldIcon'
import TrophyIcon from '@components/ui/icons/trophyIcon'
import RoundSelect from '@components/ui/select'
import Container from '@mui/material/Container'
import MuiBox from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { motion, Variants } from 'framer-motion'
import { styled } from '@mui/material/styles'
import AchievementCard from '@components/cards/achievementCard'
import Achieve1Icon from '@components/ui/icons/achieve1Icon'
import Achieve2Icon from '@components/ui/icons/achieve2Icon'
import Achieve3Icon from '@components/ui/icons/achieve3Icon'
import Achieve4Icon from '@components/ui/icons/achieve4Icon'
import AboutUsCard from '@components/cards/aboutUsCard'
import AdvertiseCard from '@components/cards/advertiseCard'
import ArticleLayout from '@components/layouts/article'
import { Achievement, Blog, FeatureType, Field } from '@shared/interfaces'
const titleVariants: Variants = {
  initial: {
    opacity: 0,
    x: 20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
}
const SectionBackgroundLight = styled(MuiBox)(({ theme }) => ({
  background: theme.palette.primary.light
  // height: '90vh',
}))

const SectionBackgroundDark = styled(MuiBox)(({ theme }) => ({
  background: theme.palette.primary.main
  // height: '90vh',
}))

const featureLists: FeatureType[] = [
  {
    title: 'Chất lượng cao',
    discription: 'Từ những công ty hàng đầu',
    icon: <TrophyIcon />
  },
  {
    title: 'Đáng tin cậy',
    discription: 'Được nhiều sự tin tưởng',
    icon: <GuaranteeIcon />
  },
  {
    title: 'An toàn',
    discription: 'Đảm bảo tuyệt đối',
    icon: <ShieldIcon />
  },
  {
    title: 'Trợ giúp 24/7',
    discription: 'Trợ giúp tận tuỵ',
    icon: <CustomerSupportIcon />
  }
]

const latestJobLists: JobCardProps[] = [
  {
    id: 1,
    jobTitle: 'Nhân viên bảo trì thiết bị',
    companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
    location: 'Hà Nội',
    salary: ' VND 2.5 - 3 triệu',
    experience: 'Từ 1 - 3 năm',
    createAt: new Date('2023-03-16').getTime()
  },
  {
    id: 2,
    jobTitle: 'Nhân viên bảo trì thiết bị',
    companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
    location: 'Hà Nội',
    salary: ' VND 2.5 - 3 triệu',
    experience: 'Từ 1 - 3 năm',
    createAt: new Date('2022-03-25').getTime()
  }
]

const fieldLists: Field[] = [
  {
    id: 1,
    fieldTitle: 'Nhân sự/ Human Resource/ HR',
    description:
      'Making this the first true value generator on the Internet. It of over 200 Latin words, combined with a handful.',
    vacantNumber: 1022
  },
  {
    id: 2,
    fieldTitle: 'Nhân sự/ Human Resource/ HR',
    description:
      'Making this the first true value generator on the Internet. It of over 200 Latin words, combined with a handful.',
    vacantNumber: 1022
  },
  {
    id: 3,
    fieldTitle: 'Nhân sự/ Human Resource/ HR',
    description:
      'Making this the first true value generator on the Internet. It of over 200 Latin words, combined with a handful.',
    vacantNumber: 1022
  }
]

const achievementLists: Achievement[] = [
  {
    title: 'Chất lượng cao',
    description: 'Từ những công ty hàng đầu',
    icon: <Achieve1Icon />
  },
  {
    title: 'Chất lượng cao',
    description: 'Từ những công ty hàng đầu',
    icon: <Achieve2Icon />
  },
  {
    title: 'Chất lượng cao',
    description: 'Từ những công ty hàng đầu',
    icon: <Achieve3Icon />
  },
  {
    title: 'Chất lượng cao',
    description: 'Từ những công ty hàng đầu',
    icon: <Achieve4Icon />
  }
]

const blogList: Blog[] = [
  {
    id: 1,
    image: '/images/Blog_1.png',
    title: 'The best website in 2023',
    date: new Date('2023-01-10')
  },
  {
    id: 1,
    image: '/images/Blog_2.png',
    title: 'Solution for your future',
    date: new Date('2021-01-20')
  },
  {
    id: 1,
    image: '/images/Blog_3.png',
    title: 'Make your resume better and find your own job',
    date: new Date('2023-01-10')
  }
]

export default function Home() {
  return (
    <>
      <section>
        <SectionBackgroundDark>
          <ArticleLayout>
            <Container sx={{ padding: '4% 0 4%' }}>
              <AdvertiseCard />
            </Container>
          </ArticleLayout>
        </SectionBackgroundDark>
        {/* <Carousel /> */}
      </section>
      <ArticleLayout>
        <Container>
          <section style={{ margin: '3rem 0' }}>
            <Grid
              container
              justifyContent="center"
              // alignItems="center"
              columnSpacing={4}
              rowSpacing={5}
            >
              {featureLists.map((feature, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.discription}
                  />
                </Grid>
              ))}
            </Grid>
          </section>
          <section>
            <Grid
              sx={{ padding: '3rem 0' }}
              container
              columnSpacing={2}
              rowSpacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12}>
                <motion.div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  variants={titleVariants}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Typography variant="h4">Tin tuyển dụng</Typography>

                  <RoundSelect outlined />
                </motion.div>
              </Grid>
              {latestJobLists.map((job, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <JobCard {...job} />
                </Grid>
              ))}

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <motion.div
                  variants={titleVariants}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <OutlinedButton href={'/viec-lam'}>Xem thêm</OutlinedButton>
                </motion.div>
              </Grid>
            </Grid>
          </section>
          <section style={{ padding: '3rem 0' }}>
            <Grid
              container
              columnSpacing={8}
              rowSpacing={3}
              justifyContent="center"
            >
              <Grid item xs={12}>
                <motion.div
                  variants={titleVariants}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Typography variant="h4">
                    Khám phá nghề nghiệp mơ ước
                  </Typography>
                </motion.div>
              </Grid>
              {fieldLists.map((field, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FieldCard {...field} />
                </Grid>
              ))}
            </Grid>
          </section>
        </Container>
        <SectionBackgroundLight>
          <Container>
            <section style={{ padding: '3rem 0' }}>
              <Grid
                container
                justifyContent="space-evenly"
                alignItems="center"
                columnSpacing={4}
                rowSpacing={2}
              >
                <Grid item xs={12}>
                  <motion.div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '0 0 8%'
                    }}
                    variants={titleVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Typography variant="h4">Giải thưởng, thành tựu</Typography>
                  </motion.div>
                </Grid>
                {achievementLists.map((achievement, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <AchievementCard {...achievement} />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <motion.div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '10% 0 0'
                    }}
                    variants={titleVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Typography variant="h4">Về chúng tôi</Typography>
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <AboutUsCard />
                </Grid>
              </Grid>
            </section>
          </Container>
        </SectionBackgroundLight>
        <Container>
          <section style={{ padding: '3rem 0' }}>
            <motion.div
              variants={titleVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h4">Những bài blog về nhóm</Typography>
            </motion.div>
            <Slider items={blogList} />
          </section>
        </Container>
      </ArticleLayout>
    </>
  )
}
