import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import JobCard from '@components/cards/jobCard'
import { styled } from '@mui/material/styles'
import RoundButton from '@components/ui/button/roundButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'
const CustomListItem = styled(ListItem)(({ theme }) => ({
    padding: `0 0 ${theme.spacing(2)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('md')]: {
        padding: `0 0 ${theme.spacing(2)} 0`
    },
    // justifyContent: 'flex-end',
    width: '100%'
}))

const SuitableJob = () => {
    return (
        <Box>
            <List disablePadding sx={{}}>
                <CustomListItem>
                    <RoundButton
                        primary={true}
                        startIcon={<FileUploadIcon />}
                        style={{ fontSize: '1rem', padding: '10px 12px' }}
                    >
                        Tải CV lên
                    </RoundButton>
                </CustomListItem>
                <CustomListItem>
                    <JobCard type={2} />
                </CustomListItem>
                <CustomListItem>
                    <JobCard type={2} />
                </CustomListItem>
                <CustomListItem>
                    <JobCard type={2} />
                </CustomListItem>
                <CustomListItem>
                    <JobCard type={2} />
                </CustomListItem>
            </List>
        </Box>
    )
}

export default SuitableJob
