import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container, Chip, Typography } from '@mui/material';
export const HolographicText = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    letterSpacing: '0.05em',
    fontSize: '3.2rem',
    lineHeight: 1.2,
    padding: '10px',
    position: 'absolute',
    top: '1%',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
        textAlign: 'center',
    },
}));
export const FrostedGlassBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'featured',
})(({ theme, featured }) => ({
    marginBottom: featured ? '40px' : '20px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    ...(featured && {
        boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}, 0 4px 30px rgba(0, 0, 0, 0.1)`,
        transform: 'scale(1.02)',
    }),
}));

export const FrostedGlassContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

export const MainSectionContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6, 2),
    position: 'relative',
    transition: 'transform 0.3s ease-out',
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        minHeight: '100vh',
        padding: theme.spacing(4, 1),
    },
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .header-overlay': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        padding: '6rem 1rem 2rem',
        textAlign: 'center',
    },
    '& .header-title': {
        color: theme.palette.text.primary,
        fontWeight: 700,
        letterSpacing: 1,
        fontSize: {
            xs: '2rem',
            sm: '3rem',
            md: '3.75rem',
        },
        marginBottom: theme.spacing(1),
    },
    '& .header-description': {
        color: theme.palette.text.secondary,
        maxWidth: '600px',
        fontWeight: 400,
        fontSize: { xs: '0.9rem', sm: '1.1rem' },
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    border: `2px solid ${theme.palette.primary.main}`,
}));

export const EnhancedTitle = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    fontWeight: 700,
    filter: 'drop-shadow(0 0 10px rgba(100, 180, 255, 0.5))',
    background:
        'linear-gradient(90deg, #ffffff 0%, rgb(1, 242, 255) 55%, rgb(0, 192, 202) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

