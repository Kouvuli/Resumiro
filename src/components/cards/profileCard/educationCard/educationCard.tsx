import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import EducationItem from './educationItem'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
interface EducationCardProps {
    style?: React.CSSProperties
}

const variants: Variants = {
    initial: {
        opacity: 0,
        y: '20px'
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const CustomListItem = styled(ListItem)(({}) => ({
    paddingLeft: 'unset',
    paddingRight: 'unset'
}))

const EducationCard: React.FC<EducationCardProps> = ({ style }) => {
    return (
        <motion.div
            style={style}
            variants={variants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    title={
                        <Typography
                            variant="h5"
                            color="text.primary"
                            sx={{ fontSize: '20px' }}
                        >
                            Học vấn
                        </Typography>
                    }
                    action={
                        <>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                            <IconButton>
                                <CreateIcon />
                            </IconButton>
                        </>
                    }
                    sx={{ pb: 1 }}
                />
                <CardContent sx={{ py: 'unset' }}>
                    <List disablePadding>
                        <CustomListItem>
                            <EducationItem />
                        </CustomListItem>
                        <CustomListItem>
                            <EducationItem />
                        </CustomListItem>
                        <CustomListItem>
                            <EducationItem />
                        </CustomListItem>
                    </List>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default EducationCard
