import React, { useEffect } from 'react'
import { Select } from 'antd'
import { useAppDispatch } from '@hooks/index'
import jobSlice from '@redux/reducers/jobSlice'
interface RoundSelectProps {
  style?: React.CSSProperties
  handleChange?: (_value: string) => void
  options: { value: string; label: string }[]
}

// const CustomRoundSelectType1Outlined = styled(Select)(({ theme }) => ({
//   '&:hover': {
//     '& .ant-select-selector': {
//       borderColor: `${theme.palette.primary.main}!important`
//     }
//   },
//   '& .ant-select-selector': {
//     backgroundColor: 'transparent!important',
//     boxShadow: 'none!important'
//   }
// }))

// const CustomRoundSelectType1 = styled(Select)(({}) => ({
//   '&:hover': {
//     '& .ant-select-selector': {
//       borderColor: `transparent!important`
//     }
//   },

//   '& .ant-select-selector': {
//     borderColor: `transparent!important`,
//     backgroundColor: 'transparent!important',
//     boxShadow: 'none!important'
//   }
// }))

// const CustomRoundSelectType2 = styled(Select)(({ theme }) => ({
//   '&:hover': {
//     '& .ant-select-selector': {
//       borderColor: `${theme.palette.primary.main}!important`
//     }
//   },
//   '& .ant-select-selector': {
//     borderColor: `transparent!important`,
//     backgroundColor: 'transparent!important',
//     boxShadow: 'none!important',
//     color: theme.palette.primary.contrastText
//   },
//   '& .ant-select-arrow': {
//     color: theme.palette.primary.contrastText
//   },
//   '&.ant-select-open .ant-select-selection-item': {
//     color: theme.palette.primary.contrastText
//   }
// }))

// const CustomOption = styled(Option)(({ theme }) => ({
//     '& .ant-select-open:hover': {
//         backgroundColor: `${theme.palette.primary.main}!important`
//     }
// }))

const RoundSelect: React.FC<RoundSelectProps> = ({
  style,
  options,
  handleChange
}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(jobSlice.actions.changeOrderBy(options[0].value))
  }, [])

  return (
    <>
      {
        <Select
          style={style}
          defaultValue={options[0].value}
          onChange={handleChange}
          options={options}
        />
      }
    </>
  )
}
export default RoundSelect
