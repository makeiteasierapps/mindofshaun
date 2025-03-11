import { ThemeProvider } from '@mui/material/styles';
import { theme } from './contexts/theme';
import { Box, styled } from '@mui/material';
import NavBar from './components/Header';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import Home from './components/Home';
import ConwayBackground from './components/ConwayBackground';
import ParallaxContainer from './components/ParallaxContainer';
import Blog from './components/blog/Blog';
import { AuthProvider } from './contexts/AuthContext';
import { PostsProvider } from './contexts/PostsContext';

const MainContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh',
    overflowX: 'hidden', // Prevent horizontal scrolling
    '@media (max-width: 768px)': {
        marginTop: '60px',
    },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    '& > *': {
        marginBottom: theme.spacing(4), // Add some spacing between sections
    },
}));

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <PostsProvider>
                    <MainContainer>
                        <ConwayBackground />
                        <NavBar />
                        <SectionWrapper>
                            <ParallaxContainer speed={0.15}>
                                <Home />
                            </ParallaxContainer>
                            <ParallaxContainer speed={0.25}>
                                <Projects />
                            </ParallaxContainer>
                            <ParallaxContainer speed={0.3}>
                                <Blog />
                            </ParallaxContainer>
                            <ParallaxContainer speed={0.35}>
                                <ContactMe />
                            </ParallaxContainer>
                        </SectionWrapper>
                    </MainContainer>
                </PostsProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
