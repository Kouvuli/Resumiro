import React from 'react'
import { styled } from '@mui/material/styles'
const CustomShieldIcon = styled('svg')(({ theme }) => ({
  '& path': {
    stroke: theme.palette.text.primary
  }
}))

const ShieldIcon = () => {
  return (
    <CustomShieldIcon
      width="33"
      height="32"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.875 26.0002L24.2917 30.3336L33.125 21.6669M45.5314 12.9656C38.5489 13.3294 31.7045 10.9606 26.5 6.37891C21.2956 10.9606 14.4511 13.3294 7.46859 12.9656C6.90664 15.1 6.62318 17.2958 6.62501 19.5002C6.62501 31.6141 15.0697 41.7952 26.5 44.6812C37.9303 41.7952 46.375 31.6162 46.375 19.5002C46.375 17.2426 46.0813 15.0542 45.5314 12.9656Z"
        stroke="#3A3A3A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CustomShieldIcon>
  )
}

export default ShieldIcon
