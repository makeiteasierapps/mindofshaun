import { useState } from 'react';
import { styled, Box, Button, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const MenuContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    '&:hover .nav-menu': {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateX(0)',
    },
}));

// The actual navigation menu that slides in
const Menu = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginLeft: '50px',
    background: 'rgba(24, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: '5px 15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 178, 181, 0.2)',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(-20px)',
    transition: 'all 0.3s ease',
    gap: '10px',
}));

const NavMenuItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
    color: active ? theme.palette.primary.main : 'rgba(229, 252, 255, 0.7)',
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
}));

const sections = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
];

const NavMenu = () => {
    const [activeSection, setActiveSection] = useState(0);
    const handleNavClick = (index) => {
        setActiveSection(index);
    };
    return (
        <>
            <MenuContainer>
                <Fab
                    size="small"
                    aria-label="Back to top"
                    sx={{
                        background: 'rgba(0, 178, 181, 0.2)',
                        color: 'rgba(229, 252, 255, 0.7)',
                        width: '40px',
                        height: '40px',
                        minHeight: 'unset',
                        boxShadow: '0 2px 5px rgba(0, 178, 181, 0.3)',
                        border: '1px solid rgba(0, 178, 181, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            background: 'rgba(0, 178, 181, 0.4)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 3px 8px rgba(0, 178, 181, 0.4)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <KeyboardArrowUpIcon fontSize="small" />
                </Fab>

                <Menu className="nav-menu">
                    {sections.map((section, index) => (
                        <NavMenuItem
                            key={index}
                            active={activeSection === index}
                            href={`#${section.id}`}
                            component="a"
                            onClick={() => handleNavClick(index)}
                        >
                            {section.name}
                        </NavMenuItem>
                    ))}
                </Menu>
            </MenuContainer>
        </>
    );
};

export default NavMenu;
