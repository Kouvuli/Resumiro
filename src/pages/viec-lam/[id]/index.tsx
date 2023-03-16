import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ArticleLayout from '@components/layouts/article'
import JobDetailCard from '@components/cards/detailCard/jobDetail/jobDetailCard'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import DenseChip from '@components/ui/chip/DenseChip'
import { styled } from '@mui/material/styles'
import CompanyBriefCard from '@components/cards/detailCard/jobDetail/companyBriefCard'
import SuitableJob from '@components/lists/suitableJob'
const DetailJobList = styled(`ul`)(({ theme }) => ({
    listStyle: 'none',
    '& li p': {
        paddingTop: theme.spacing(1.5),
        '&:before': {
            display: 'inline-block',
            content: '""',
            '-webkit-border-radius': '0.375rem',
            borderRadius: '0.375rem',
            height: '0.4rem',
            width: '0.4rem',
            marginRight: '0.5rem',
            marginBottom: '0.2rem',
            backgroundColor: theme.palette.text.primary
        }
    }
}))

const JobDetailPage = () => {
    return (
        <ArticleLayout title="Chi tiết việc làm">
            <Container>
                <Grid container marginTop="1rem " marginBottom="5rem">
                    <Grid item xs={12} md={7.5}>
                        <JobDetailCard />
                        <List>
                            <ListItem>
                                <Typography variant="h5">Skills</Typography>
                            </ListItem>
                            <ListItem sx={{ flexWrap: 'wrap' }}>
                                <DenseChip
                                    style={{
                                        fontWeight: 500,
                                        marginRight: 1,
                                        marginBottom: 1
                                    }}
                                    label="Java"
                                />
                                <DenseChip
                                    style={{
                                        fontWeight: 500,
                                        marginRight: 1,
                                        marginBottom: 1
                                    }}
                                    label="Java Spring Boot"
                                />
                                <DenseChip
                                    style={{
                                        fontWeight: 500,
                                        marginRight: 1,
                                        marginBottom: 1
                                    }}
                                    label="Object-Oriented Programming (OOP)"
                                />
                                <DenseChip
                                    style={{
                                        fontWeight: 500,
                                        marginRight: 1,
                                        marginBottom: 1
                                    }}
                                    label="Java Swing"
                                />
                                <DenseChip
                                    style={{
                                        fontWeight: 500,
                                        marginRight: 1,
                                        marginBottom: 1
                                    }}
                                    label="Spring Framework"
                                />
                            </ListItem>

                            <ListItem
                                sx={{
                                    diplay: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start'
                                }}
                            >
                                <Typography
                                    sx={{
                                        mt: 2,
                                        fontSize: '18px',
                                        fontWeight: 700
                                    }}
                                >
                                    Chi tiết công việc
                                </Typography>
                                <Typography
                                    sx={{
                                        textDecoration: 'underline',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        mt: 2
                                    }}
                                >
                                    Yêu cầu ứng viên
                                </Typography>
                                <DetailJobList>
                                    <li>
                                        <Typography variant="body1">
                                            Sinh viên năm cuối, sắp tốt nghiệp
                                            các ngành CNTT, Công nghệ phần mềm,
                                            Khoa học máy tính hoặc các ngành
                                            khác có liên quan.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">
                                            Nắm vững kiến thức và đã từng làm
                                            qua các dự án sử dụng Java/Java
                                            Spring Boot,...
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">
                                            Có thể làm việc fulltime.
                                        </Typography>
                                    </li>
                                </DetailJobList>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textDecoration: 'underline',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        mt: 2
                                    }}
                                >
                                    Quyền lợi
                                </Typography>
                                <DetailJobList>
                                    <li>
                                        <Typography variant="body1">
                                            Nhận mức trợ cấp 5.000.000 VND/
                                            tháng.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">
                                            Nắm vững kiến thức và đã từng làm
                                            qua các dự án sử dụng Java/Java
                                            Spring Boot,...
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">
                                            Có thể làm việc fulltime.
                                        </Typography>
                                    </li>
                                </DetailJobList>
                            </ListItem>
                            <ListItem>
                                <CompanyBriefCard />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4.5}>
                        <SuitableJob title="Công việc tương tự" />
                    </Grid>
                </Grid>
            </Container>
        </ArticleLayout>
    )
}

export default JobDetailPage
