import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 115, 117)',
      light: 'rgb(0, 178, 181)',
      dark: '#0d5c63',
    },
    secondary: {
      main: '#3891a6', // vibrantTeal
      light: '#e5fcff', // lightBlue
    },
    background: {
      default: '#ffffff',
      paper: 'rgb(0, 12, 12)',
      shadow: 'rgba(2, 202, 252, 0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgb(0, 178, 181)',
      hover: 'rgb(0, 178, 181)',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontFamily: 'Comfortaa, sans-serif',
    },
    h2: {
      fontFamily: 'Comfortaa, sans-serif',
    },
    h3: {
      fontFamily: 'Comfortaa, sans-serif',
    },
    h4: {
      fontFamily: 'Comfortaa, sans-serif',
    },
    h5: {
      fontFamily: 'Comfortaa, sans-serif',
    },
    h6: {
      fontFamily: 'Comfortaa, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(0, 115, 117)',
          '&:hover': {
            backgroundColor: 'rgb(0, 178, 181)',
          },
        },
      },
    },
  },
});

