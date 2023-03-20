import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'

interface ToggleButtonProps {
  icon: React.ReactNode
}

const Toggle: React.FC<ToggleButtonProps> = ({ icon }) => {
  return (
    <ToggleButton value="bold" aria-label="bold">
      {icon}
    </ToggleButton>
  )
}

export default Toggle
