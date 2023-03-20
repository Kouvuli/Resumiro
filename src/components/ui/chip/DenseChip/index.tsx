import React from 'react'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
interface DenseChipProps {
  label: string
  style?: React.CSSProperties
}

const CustomDenseChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontSize: '13.5px',
  padding: theme.spacing(0.5)
}))

const DenseChip: React.FC<DenseChipProps> = ({ label, style }) => {
  return (
    <CustomDenseChip
      sx={style}
      size="medium"
      label={label}
      variant="outlined"
    ></CustomDenseChip>
  )
}

export default DenseChip
