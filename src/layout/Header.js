import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'black',
    zIndex: 1000,
}));

const StyledIconButton = styled(IconButton)({
    color: 'white',
});

const NavContainer = styled(Stack)(({ theme }) => ({
    width: '100%',
    justifyContent: 'center',
    color: 'white',
    fontFamily: theme.typography.fontFamily,
    fontSize: 'clamp(25px, 3vw, 30px)',
}));

const Header = () => {
    const theme = useTheme();

    return (
        <StyledAppBar position="fixed">
            <Toolbar disableGutters>
                <NavContainer direction="row" spacing={2}>
                    <StyledIconButton
                        aria-label="home"
                        href="#home"
                        id="HomeIcon"
                        size="large"
                    >
                        <HomeIcon fontSize="inherit" />
                    </StyledIconButton>

                    <StyledIconButton
                        aria-label="projects"
                        href="#projects"
                        size="large"
                    >
                        <WorkIcon fontSize="inherit" />
                    </StyledIconButton>

                    <StyledIconButton
                        aria-label="contact"
                        href="#contact"
                        size="large"
                    >
                        <EmailIcon fontSize="inherit" />
                    </StyledIconButton>
                </NavContainer>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
