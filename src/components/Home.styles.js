import { styled } from '@mui/material/styles';
import { Typography, Box, Button, Fab } from '@mui/material';
import { animated } from 'react-spring';

// Holographic text effect with improved readability
export const HolographicText = styled(animated(Typography))(({ theme }) => ({
    background: 'linear-gradient(90deg, #00B2B5, #3891a6, #e5fcff, #00B2B5)',
    backgroundSize: '300% 300%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow:
        '0 0 8px rgba(0, 178, 181, 0.7), 0 0 15px rgba(0, 178, 181, 0.4)',
    animation: 'gradient 8s ease infinite',
    fontWeight: 800,
    letterSpacing: '0.05em',
    fontSize: '3.2rem',
    lineHeight: 1.2,
    padding: '10px',
    position: 'relative',
    filter: 'drop-shadow(0 5px 15px rgba(0, 178, 181, 0.5))',
    transform: 'perspective(1000px) translateZ(20px)',
    '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
        textAlign: 'center',
    },
}));

// Enhanced Bio Text with improved contrast and readability
export const EnhancedBioText = styled(animated(Typography))(({ theme }) => ({
    letterSpacing: '0.02em',
    color: '#e5fcff',
    textShadow: '0 0 5px rgba(0, 178, 181, 0.5)',
    position: 'relative',
    padding: theme.spacing(2, 0),
    fontFamily: 'monospace',
    lineHeight: 1.8,
    fontSize: '1.05rem',
    fontWeight: 400,
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '10%',
        width: '80%',
        height: '1px',
        background:
            'linear-gradient(90deg, rgba(0,178,181,0), rgba(0,178,181,0.7), rgba(0,178,181,0))',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.95rem',
        textAlign: 'center',
        lineHeight: 1.6,
    },
}));

// Button container with responsive layout
export const ButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginTop: theme.spacing(3),
    },
}));

// Consolidated container combining FullWidthBackgroundContainer and ContentOverlay
export const HomeContainer = styled(Box)(({ theme }) => ({
    // From FullWidthBackgroundContainer
    position: 'relative',
    width: '100%',
    height: '100vh', // Use fixed height for consistent snapping
    padding: theme.spacing(4, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    scrollSnapAlign: 'start', // Consistent scroll snapping
    scrollSnapStop: 'always', // Force stopping at this snap point

    // From ContentOverlay - content constraints
    '& .content-area': {
        width: '100%',
        maxWidth: '1200px',
        padding: theme.spacing(4),
        position: 'relative',
        zIndex: 1,
        borderRadius: '20px',

        // Semi-transparent background from ContentOverlay
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 12, 12, 0.7)', // Reduced opacity
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'borderPulse 5s ease-in-out infinite',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 178, 181, 0.2)',
            zIndex: -1,
        },

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },

    // Animations
    '@keyframes borderPulse': {
        '0%': { boxShadow: '0 0 15px rgba(0, 178, 181, 0.3)' },
        '50%': { boxShadow: '0 0 25px rgba(0, 178, 181, 0.5)' },
        '100%': { boxShadow: '0 0 15px rgba(0, 178, 181, 0.3)' },
    },

    // Responsive adjustments
    [theme.breakpoints.down('md')]: {
        height: 'auto', // Allow content to determine height on mobile
        minHeight: '100vh', // But ensure at least full viewport height
        padding: theme.spacing(3, 1),
    },
}));

// Floating back to top button with enhanced styling
export const BackToTopButton = styled(Fab)(({ theme, show }) => ({
    position: 'fixed',
    top: theme.spacing(3),
    left: theme.spacing(3),
    background: 'rgba(0, 178, 181, 0.6)', // More visible background
    color: '#ffffff', // Brighter text color
    boxShadow: '0 2px 5px rgba(0, 178, 181, 0.5)',
    opacity: show ? 1 : 0, // Full opacity when shown
    visibility: show ? 'visible' : 'hidden',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
    border: '1px solid rgba(0, 178, 181, 0.4)',
    width: '40px',
    height: '40px',
    minHeight: 'unset',
    '&:hover': {
        background: 'rgba(0, 178, 181, 0.8)',
        transform: 'scale(1.05)',
        boxShadow: '0 3px 8px rgba(0, 178, 181, 0.6)',
    },
    '&:active': {
        transform: 'scale(0.98)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        borderRadius: '50%',
        background: 'transparent',
        border: '1px solid rgba(0, 178, 181, 0.4)',
        opacity: 0.5,
    },
}));
