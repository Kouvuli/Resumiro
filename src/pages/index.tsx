import FeatureCard from '@components/cards/featureCard'
import FieldCard from '@components/cards/fieldCard'
import JobCard from '@components/cards/jobCard'
import Carousel from '@components/carousel/carousel'
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
const titleVariants: Variants = {
    initial: {
        opacity: 0,
        x: 20
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5
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
                            <Grid item xs={12} md={3}>
                                <FeatureCard
                                    icon={<TrophyIcon />}
                                    title="Chất lượng cao"
                                    description="Từ những công ty hàng đầu"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FeatureCard
                                    icon={<GuaranteeIcon />}
                                    title="Đáng tin cậy"
                                    description="Được nhiều sự tin tưởng"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FeatureCard
                                    icon={<ShieldIcon />}
                                    title="An toàn"
                                    description="Đảm bảo tuyệt đối"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FeatureCard
                                    icon={<CustomerSupportIcon />}
                                    title="Trợ giúp 24/7"
                                    description="Trợ giúp tận tuỵ"
                                />
                            </Grid>
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
                                    <Typography variant="h4">
                                        Tin tuyển dụng
                                    </Typography>

                                    <RoundSelect outlined />
                                </motion.div>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <JobCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <JobCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <JobCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <JobCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <JobCard />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <OutlinedButton>Xem thêm</OutlinedButton>
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
                            <Grid item xs={12} md={6}>
                                <FieldCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldCard />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldCard />
                            </Grid>
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
                                        <Typography variant="h4">
                                            Giải thưởng, thành tựu
                                        </Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <AchievementCard
                                        icon={<Achieve1Icon />}
                                        title="Chất lượng cao"
                                        description="Từ những công ty hàng đầu"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <AchievementCard
                                        icon={<Achieve2Icon />}
                                        title="Chất lượng cao"
                                        description="Từ những công ty hàng đầu"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <AchievementCard
                                        icon={<Achieve3Icon />}
                                        title="Chất lượng cao"
                                        description="Từ những công ty hàng đầu"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <AchievementCard
                                        icon={<Achieve4Icon />}
                                        title="Chất lượng cao"
                                        description="Từ những công ty hàng đầu"
                                    />
                                </Grid>
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
                                        <Typography variant="h4">
                                            Về chúng tôi
                                        </Typography>
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
                            <Typography variant="h4">
                                Những bài blog về nhóm
                            </Typography>
                        </motion.div>
                        <Carousel />
                    </section>
                </Container>
            </ArticleLayout>
        </>
    )
}
