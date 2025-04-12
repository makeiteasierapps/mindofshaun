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
            default: 'rgb(0, 12, 12)',
            paper: 'rgb(0, 37, 37, 0.4)',
            shadow: 'rgba(2, 202, 252, 0.1)',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgb(0, 178, 181)',
            hover: 'rgb(0, 178, 181)',
            gradient: 'linear-gradient(45deg,rgb(0, 178, 181), #004a4c)',
        },
        action: {
            active: 'rgb(0, 178, 181)',
            hover: 'rgba(0, 178, 181, 0.08)',
            selected: 'rgba(0, 115, 117, 0.16)',
            selectedOpacity: 'rgba(0, 115, 117, 0.24)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            fontSize: '1.2rem',
        },
        h5: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h6: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.57,
            letterSpacing: '0.02em',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
        },
        body2: {
            fontSize: '0.9rem',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    marginBottom: '0.35em',
                },
            },
        },
    },
});
