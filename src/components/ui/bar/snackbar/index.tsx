import { useAppDispatch, useAppSelector } from '@hooks/index'
import { Alert, Snackbar } from '@mui/material'
import profileSlice from '@redux/reducers/profileSlice'
import { profileSelector } from '@redux/selectors'
import React from 'react'

const MySnackBar = ({}) => {
  const { showMessage, message, messageType } = useAppSelector(profileSelector)
  const dispatch = useAppDispatch()
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // if (reason === 'clickaway') {
    //   dispatch(profileSlice.actions.toggleSnackBar({ showMessage: false }))
    // }
    dispatch(profileSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <Snackbar
      open={showMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={messageType}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MySnackBar
