import { useState } from 'react'
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
import { skills } from '@prisma/client'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { useSession } from 'next-auth/react'
import { CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector, web3Selector } from '@redux/selectors'
import { createCandidateSkill } from '@redux/reducers/profileSlice'
interface SkillCardProps {
  type?: number
  style?: React.CSSProperties
  skills: { skill: skills }[]
  allSkills: skills[]
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

const SkillCard: React.FC<SkillCardProps> = ({
  type,
  style,
  skills,
  allSkills
}) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const [isModify, setIsModify] = useState(false)
  const { loading } = useAppSelector(profileSelector)
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const skill = data.get('skill')!.toString()
    console.log(
      JSON.stringify({ address: wallet.address, skills: [Number(skill)] })
    )
    await resumiro.connectCandidateSkill(wallet.address, [Number(skill)])
    dispatch(
      createCandidateSkill({
        id: session!.user!.name!,
        skill_id: Number(skill)
      })
    )
    setOpen(false)
  }
  const modifyToggleHandler = () => {
    setIsModify(prev => !prev)
  }

  if (type === 2) {
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
                Kỹ năng
              </Typography>
            }
          />
          <CardContent sx={{ paddingTop: 'unset', paddingBottom: 'unset' }}>
            <List disablePadding>
              {skills.map((item, index) => {
                return (
                  <div key={index}>
                    <CustomListItem>
                      <SkillItem
                        id={item.skill.id}
                        name={item.skill.name}
                        isModify={isModify}
                      />
                    </CustomListItem>
                    {index !== skills.length - 1 && (
                      <Divider sx={{ borderWidth: '0.5px' }} />
                    )}
                  </div>
                )
              })}
            </List>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

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
              Kỹ năng
            </Typography>
          }
          action={
            <>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={modifyToggleHandler}>
                <CreateIcon />
              </IconButton>
            </>
          }
        />
        <CardContent sx={{ paddingTop: 'unset', paddingBottom: 'unset' }}>
          <List disablePadding>
            {skills.map((item, index) => {
              return (
                <div key={index}>
                  <CustomListItem>
                    <SkillItem
                      id={item.skill.id}
                      name={item.skill.name}
                      isModify={isModify}
                    />
                  </CustomListItem>
                  {index !== skills.length - 1 && (
                    <Divider sx={{ borderWidth: '0.5px' }} />
                  )}
                </div>
              )
            })}
          </List>
        </CardContent>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            borderRadius: '5px',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                name="skill"
                id="skill"
                label="Skill"
                defaultValue={10}
                SelectProps={{
                  native: true
                }}
              >
                {allSkills.map((skill: skills, i) => (
                  <option value={skill.id} key={i}>
                    {skill.name}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '1rem'
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  disableRipple
                  color="primary"
                  onClick={handleClose}
                  sx={{
                    mr: 1,
                    p: 1.5,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  type="submit"
                  disableElevation
                  disableRipple
                  variant="contained"
                  color="secondary"
                  endIcon={loading && <CircularProgress size={18} />}
                  sx={{
                    p: 1.5,
                    textTransform: 'capitalize',
                    fontSize: '1rem'
                  }}
                >
                  OK
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </motion.div>
  )
}

export default SkillCard
