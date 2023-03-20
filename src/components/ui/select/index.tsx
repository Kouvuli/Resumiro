import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Select, SelectProps } from 'antd'
import styles from './styles.module.css'
const { Option } = Select
interface RoundSelectProps {
  type?: number
  style?: React.CSSProperties
  outlined?: boolean
}

const CustomRoundSelectType1Outlined = styled(Select)(({ theme }) => ({
  '&:hover': {
    '& .ant-select-selector': {
      borderColor: `${theme.palette.primary.main}!important`
    }
  },
  '& .ant-select-selector': {
    backgroundColor: 'transparent!important',
    boxShadow: 'none!important'
  }
}))

const CustomRoundSelectType1 = styled(Select)(({}) => ({
  '&:hover': {
    '& .ant-select-selector': {
      borderColor: `transparent!important`
    }
  },

  '& .ant-select-selector': {
    borderColor: `transparent!important`,
    backgroundColor: 'transparent!important',
    boxShadow: 'none!important'
  }
}))

const CustomRoundSelectType2 = styled(Select)(({ theme }) => ({
  '&:hover': {
    '& .ant-select-selector': {
      borderColor: `${theme.palette.primary.main}!important`
    }
  },
  '& .ant-select-selector': {
    borderColor: `transparent!important`,
    backgroundColor: 'transparent!important',
    boxShadow: 'none!important',
    color: theme.palette.primary.contrastText
  },
  '& .ant-select-arrow': {
    color: theme.palette.primary.contrastText
  },
  '&.ant-select-open .ant-select-selection-item': {
    color: theme.palette.primary.contrastText
  }
}))

// const CustomOption = styled(Option)(({ theme }) => ({
//     '& .ant-select-open:hover': {
//         backgroundColor: `${theme.palette.primary.main}!important`
//     }
// }))

const RoundSelect: React.FC<RoundSelectProps> = ({ type, style, outlined }) => {
  const [age, setAge] = useState('one')

  const handleChange = (value: SelectProps) => {
    setAge(value)
    console.log(value)
  }
  if (type === 2) {
    return (
      <CustomRoundSelectType2
        defaultValue={age}
        style={style}
        // bordered={false}
        onChange={handleChange}
      >
        <Option value="one">Option 1</Option>
        <Option value="two">Option 2</Option>
        <Option value="three">Option 3</Option>
      </CustomRoundSelectType2>
    )
  }

  return (
    <>
      {outlined ? (
        <CustomRoundSelectType1Outlined
          defaultValue={age}
          style={style}
          onChange={handleChange}
        >
          <Option value="one">Option 1</Option>
          <Option value="two">Option 2</Option>
          <Option value="three">Option 3</Option>
        </CustomRoundSelectType1Outlined>
      ) : (
        <CustomRoundSelectType1
          defaultValue={age}
          style={style}
          onChange={handleChange}
        >
          <Option value="one">Option 1</Option>
          <Option value="two">Option 2</Option>
          <Option value="three">Option 3</Option>
        </CustomRoundSelectType1>
      )}
    </>
  )
}
export default RoundSelect
