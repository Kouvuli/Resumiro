import { Alert, Snackbar } from '@mui/material'
import React from 'react'

interface MySnackBarProps {
  showMessage: boolean
  message: string
  messageType: 'success' | 'error' | 'info' | 'warning'
  handleClose: (_event?: React.SyntheticEvent | Event, _reason?: string) => void
}

const MySnackBar: React.FC<MySnackBarProps> = ({
  showMessage,
  message,
  messageType,
  handleClose
}) => {
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
