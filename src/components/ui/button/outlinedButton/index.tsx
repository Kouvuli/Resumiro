import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
interface OutlinedButtonProps {
  children: React.ReactNode
  href?: string
}

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
  padding: ` ${theme.spacing(1)} ${theme.spacing(4)}`
}))

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ children, href }) => {
  return (
    <CustomOutlinedButton
      sx={{ textTransform: 'capitalize' }}
      href={href}
      variant="outlined"
      disableElevation
      disableFocusRipple
    >
      {children}
    </CustomOutlinedButton>
  )
}

export default OutlinedButton
