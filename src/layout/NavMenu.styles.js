import { styled } from '@mui/material/styles';
import { Box, Button, Fab } from '@mui/material';

export const MenuContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 9999,
    alignItems: 'center',
    '@media (max-width: 600px)': {
        top: '5px',
        left: '8px',
    },
}));

// The actual navigation menu that slides in
export const Menu = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => ({
    display: 'flex',
    marginLeft: '20px',
    background: 'rgba(24, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: '5px 15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 178, 181, 0.2)',
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    transform: open ? 'translateX(0)' : 'translateX(-20px)',
    transition: 'all 0.3s ease',
    gap: '10px',
    '@media (max-width: 600px)': {
        marginLeft: '10px',
        padding: '5px 10px',
        borderRadius: '20px',
        gap: '5px',
    },
}));

export const NavMenuItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    fontSize: '0.85rem',
    padding: '5px 10px',
    minWidth: 'unset',
    borderRadius: '15px',
    background: active ? 'rgba(0, 178, 181, 0.2)' : 'transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(0, 178, 181, 0.2)',
        transform: 'translateY(-2px)',
    },
    '@media (max-width: 600px)': {
        padding: '4px',
        borderRadius: '12px',
        '& svg': {
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
}));

export const MenuFab = styled(Fab, {
    shouldForwardProp: (prop) => prop !== 'rotate',
})(({ rotate, theme }) => ({
    background: 'rgba(0, 178, 181, 0.2)',
    color: 'rgba(229, 252, 255, 0.7)',
    width: '40px',
    height: '40px',
    minHeight: 'unset',
    boxShadow: '0 2px 5px rgba(0, 178, 181, 0.3)',
    border: '1px solid rgba(0, 178, 181, 0.2)',
    transition: 'all 0.3s ease-in-out',
    '& svg': {
        transition: 'transform 0.3s ease',
        transform: rotate ? 'rotate(-180deg)' : 'rotate(0)',
    },
    '&:hover': {
        background: 'rgba(0, 178, 181, 0.4)',
        transform: 'scale(1.05)',
        boxShadow: '0 3px 8px rgba(0, 178, 181, 0.4)',
    },
    '&:active': {
        transform: 'scale(0.98)',
    },
    '@media (max-width: 600px)': {
        width: '30px',
        height: '30px',
    },
}));
