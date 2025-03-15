import React from 'react';
import {
    Container as MuiContainer,
    Button,
    Menu,
    MenuItem,
    Typography,
    Box,
    Grid2,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactContainer = styled(MuiContainer)(({ theme }) => ({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: theme.spacing(6, 2),
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        minHeight: '100vh',
        padding: theme.spacing(4, 1),
    },
}));

const GlassmorphicContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: theme.spacing(6),
    boxShadow: `0 0px 32px 0 ${theme.palette.background.shadow}`,
    width: '90%',
    maxWidth: '600px',
}));

const SocialIconWrapper = styled(Box)(({ theme }) => ({
    fontSize: '4em',
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease, color 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        color: theme.palette.text.hover,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 4),
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        marginTop: '6px',
        minWidth: '100px',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'transparent', // Remove background color change
        color: theme.palette.text.hover, // Change text color on hover instead
        transform: 'translateX(4px)', // Keep the transform effect
    },
}));

const socialLinks = [
    {
        href: 'https://www.linkedin.com/in/shaun-o-940b591b5/',
        Icon: LinkedInIcon,
        type: 'mui-icon',
    },
    {
        href: 'https://github.com/makeiteasierapps',
        Icon: GitHubIcon,
        type: 'mui-icon',
    },
    {
        href: 'https://twitter.com/makeiteasier_',
        Icon: faXTwitter,
        type: 'font-awesome',
    },
];

const SocialLink = ({ href, Icon, type }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <SocialIconWrapper>
                {type === 'font-awesome' ? (
                    <FontAwesomeIcon icon={Icon} />
                ) : (
                    <Icon fontSize="inherit" />
                )}
            </SocialIconWrapper>
        </a>
    );
};

const ContactMe = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText('shaunoffenbacher@yahoo.com');
        handleClose();
    };

    const handleOpenMail = () => {
        window.location.href = 'mailto:shaunoffenbacher@yahoo.com';
        handleClose();
    };

    return (
        <ContactContainer maxWidth={false} id="contact">
            <GlassmorphicContainer>
                <Typography
                    variant="h2"
                    component="h1"
                    mb={6}
                    fontWeight={600}
                    sx={{
                        background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Let's Connect!
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={6}
                >
                    <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                    >
                        {socialLinks.map((link, index) => (
                            <Grid2 key={index}>
                                <SocialLink {...link} />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>

                <Box>
                    <StyledButton
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={handleClick}
                        aria-controls={open ? 'email-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        shaunoffenbacher@yahoo.com
                    </StyledButton>
                    <StyledMenu
                        id="email-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <StyledMenuItem onClick={handleCopy}>
                            Copy
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleOpenMail}>
                            Open in Mail
                        </StyledMenuItem>
                    </StyledMenu>
                </Box>
            </GlassmorphicContainer>
        </ContactContainer>
    );
};

export default ContactMe;
