import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { FormControl } from '@mui/material'
import FilterTextField from '@components/ui/textfield/filterTextField'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import jobSlice from '@redux/reducers/jobSlice'
import resumeSlice, { fetchAllSkills } from '@redux/reducers/resumeSlice'
import { resumeSelector } from '@redux/selectors'

interface FilterProps {
  type?: number
}

const CustomListItem = styled(ListItem)(({}) => ({
  paddingLeft: 'unset'
}))

const Filter: React.FC<FilterProps> = ({ type }) => {
  const dispatch = useAppDispatch()
  const { allSkills } = useAppSelector(resumeSelector)
  useEffect(() => {
    if (type === 2) {
      dispatch(fetchAllSkills())
    }
  }, [])
  const [location, setLocation] = useState<{
    [Ho_Chi_Minh: string]: boolean
    Ha_Noi: boolean
    Da_Nang: boolean
  }>({
    Ho_Chi_Minh: false,
    Ha_Noi: false,
    Da_Nang: false
  })

  const [jobType, setJobType] = useState<{
    [full_time: string]: boolean
    part_time: boolean
    intern: boolean
  }>({
    full_time: false,
    part_time: false,
    intern: false
  })

  const [experience, setExperience] = useState<{
    [less_1: string]: boolean
    '1_3': boolean
    '3_5': boolean
    '5_10': boolean
    '10': boolean
  }>({
    less_1: false,
    '1_3': false,
    '3_5': false,
    '5_10': false,
    '10': false
  })

  const handleMinSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()

    dispatch(jobSlice.actions.changeMinSalary(parseInt(event.target.value)))
  }

  const handleMaxSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault()

    dispatch(jobSlice.actions.changeMaxSalary(parseInt(event.target.value)))
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.checked
    })
  }

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobType({
      ...jobType,
      [event.target.name]: event.target.checked
    })
  }

  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExperience({
      ...experience,
      [event.target.name]: event.target.checked
    })
  }

  useEffect(() => {
    const arr = Object.keys(location).filter(key => location[key])
    dispatch(jobSlice.actions.changeLocation(arr.join(',')))
  }, [location])

  useEffect(() => {
    const arr = Object.keys(jobType).filter(key => jobType[key])
    dispatch(jobSlice.actions.changeJobType(arr.join(',')))
  }, [jobType])

  useEffect(() => {
    let arr: string[] = []
    Object.keys(experience).forEach(key => {
      if (experience[key]) {
        if (key === 'less_1') {
          arr.push('0_1')
        } else {
          arr.push(key)
        }
      }
    })
    dispatch(jobSlice.actions.changeExperience(arr.join(',')))
  }, [experience])
  const [skill, setSkill] = useState<string[]>([])

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!skill.includes(event.target.name)) {
      // skill.push(event.target.name)
      setSkill(prev => [...prev, event.target.name])
    } else {
      setSkill(prev => prev.filter(item => item !== event.target.name))
      // skill.splice(skill.indexOf(event.target.name), 1)
    }
  }
  useEffect(() => {
    dispatch(resumeSlice.actions.changeSkill(skill.join(',')))
  }, [skill])
  const { Ho_Chi_Minh, Ha_Noi, Da_Nang } = location
  const { full_time, part_time, intern } = jobType

  if (type === 2) {
    return (
      <List disablePadding>
        <CustomListItem>
          <Typography variant="h6">Kỹ năng</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormGroup>
            {allSkills.map((skill: { id: number; name: string }) => (
              <FormControlLabel
                key={skill.id}
                control={
                  <Checkbox
                    // checked={skill.name}
                    onChange={handleSkillsChange}
                    name={skill.name}
                  />
                }
                label={skill.name}
              />
            ))}
          </FormGroup>
        </CustomListItem>
      </List>
    )
  }

  return (
    <div>
      <List disablePadding>
        <CustomListItem>
          <Typography variant="h6">Lương</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <FilterTextField label="Min" onChange={handleMinSalaryChange} />
            {/* <HorizontalRuleIcon sx={{ color: 'text.primary' }} /> */}
            <Typography variant="h5" sx={{ mx: 1.2 }}>
              -
            </Typography>
            <FilterTextField label="Max" onChange={handleMaxSalaryChange} />
          </FormControl>
        </CustomListItem>
        <CustomListItem disablePadding>
          <Typography variant="h6">Thành phố</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Ho_Chi_Minh}
                  onChange={handleLocationChange}
                  name="Ho_Chi_Minh"
                />
              }
              label="Hồ Chí Minh"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Ha_Noi}
                  onChange={handleLocationChange}
                  name="Ha_Noi"
                />
              }
              label="Hà Nội"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Da_Nang}
                  onChange={handleLocationChange}
                  name="Da_Nang"
                />
              }
              label="Đà Nẵng"
            />
          </FormGroup>
        </CustomListItem>
        <CustomListItem disablePadding>
          <Typography variant="h6">Loại công việc</Typography>
        </CustomListItem>
        <CustomListItem sx={{ pb: 5 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={intern}
                  onChange={handleJobTypeChange}
                  name="intern"
                />
              }
              label="Thực tập"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={part_time}
                  onChange={handleJobTypeChange}
                  name="part_time"
                />
              }
              label="Làm việc part-time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={full_time}
                  onChange={handleJobTypeChange}
                  name="full_time"
                />
              }
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
              control={
                <Checkbox
                  checked={experience.less_1}
                  onChange={handleExperienceChange}
                  name="less_1"
                />
              }
              label="Ít hơn 1 năm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experience['1_3']}
                  onChange={handleExperienceChange}
                  name="1_3"
                />
              }
              label="Từ 1 - 3 năm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experience['3_5']}
                  onChange={handleExperienceChange}
                  name="3_5"
                />
              }
              label="Từ 3 - 5 năm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experience['5_10']}
                  onChange={handleExperienceChange}
                  name="5_10"
                />
              }
              label="Từ 5 - 10 năm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experience['10']}
                  onChange={handleExperienceChange}
                  name="10"
                />
              }
              label="Trên 10 năm"
            />
          </FormGroup>
        </CustomListItem>
      </List>
    </div>
  )
}

export default Filter
