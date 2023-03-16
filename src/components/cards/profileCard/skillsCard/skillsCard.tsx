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
import SkillItem from './skillsItem'
import { Button, CardActions, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
interface SkillCardProps {
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

const SkillCard: React.FC<SkillCardProps> = ({ style }) => {
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
                            Kinh nghiệm
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
                />
                <CardContent
                    sx={{ paddingTop: 'unset', paddingBottom: 'unset' }}
                >
                    <List disablePadding>
                        <CustomListItem>
                            <SkillItem />
                        </CustomListItem>
                        <Divider sx={{ borderWidth: '0.5px' }} />
                        <CustomListItem>
                            <SkillItem />
                        </CustomListItem>
                        <Divider sx={{ borderWidth: '0.5px' }} />
                        <CustomListItem>
                            <SkillItem />
                        </CustomListItem>
                    </List>
                </CardContent>
                <CardActions sx={{ padding: 'unset' }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Divider />
                        <Button
                            sx={{
                                py: 1.5,
                                color: 'text.secondary',
                                textTransform: 'none',
                                fontSize: '15px'
                            }}
                            variant="text"
                        >
                            Xem thêm
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </motion.div>
    )
}

export default SkillCard
