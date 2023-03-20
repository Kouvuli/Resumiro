import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MuiBox from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { FormControl } from '@mui/material'
import FilterTextField from '@components/ui/textfield/filterTextField'
import { styled } from '@mui/material/styles'
const CustomListItem = styled(ListItem)(({}) => ({
  paddingLeft: 'unset'
}))

const Filter = () => {
  return (
    <MuiBox>
      <List disablePadding>
        <CustomListItem>
          <Typography variant="h6">Kinh nghiệm</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <FilterTextField label="Min" />
            {/* <HorizontalRuleIcon sx={{ color: 'text.primary' }} /> */}
            <Typography variant="h5" sx={{ mx: 1.2 }}>
              -
            </Typography>
            <FilterTextField label="Max" />
          </FormControl>
        </CustomListItem>
        <CustomListItem disablePadding>
          <Typography variant="h6">Thành phố</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Hồ Chí Minh"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Đà Nẵng"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Hà Nội"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Bình Dương"
            />
          </FormGroup>
        </CustomListItem>
        <CustomListItem disablePadding>
          <Typography variant="h6">Loại công việc</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Thực tập"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Làm việc part-time"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Làm việc full-time"
            />
          </FormGroup>
        </CustomListItem>
        <CustomListItem disablePadding>
          <Typography variant="h6">Kinh nghiệm</Typography>
        </CustomListItem>
        <CustomListItem>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Ít hơn 1 năm"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Từ 1 - 3 năm"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Từ 3 - 5 năm"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Từ 5 - 10 năm"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Trên 10 năm"
            />
          </FormGroup>
        </CustomListItem>
      </List>
    </MuiBox>
  )
}

export default Filter
