import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { styled } from '@mui/material/styles';

// Optional styled component if you need custom styling beyond theme
const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  width: '100%',
  backgroundColor: ({ severity }) => 
    severity === 'success' ? theme.palette.success.light :
    severity === 'error' ? theme.palette.error.light :
    severity === 'warning' ? theme.palette.warning.light :
    theme.palette.info.light,
  color: ({ severity }) => 
    severity === 'success' ? theme.palette.success.contrastText :
    severity === 'error' ? theme.palette.error.contrastText :
    severity === 'warning' ? theme.palette.warning.contrastText :
    theme.palette.info.contrastText,
}));

const MySnackBar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <StyledAlert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled"
        elevation={6}
      >
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export default MySnackBar;