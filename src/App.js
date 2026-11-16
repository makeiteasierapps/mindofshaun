import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import { Box, styled } from '@mui/material';
import ProjectsMain from './pages/home/sections/projects/ProjectsMain';
import ContactMain from './pages/home/sections/contact/ContactMain';
import HeroMain from './pages/home/sections/hero/HeroMain';
import AboutMain from './pages/home/sections/about/AboutMain';
import { PixiConwayBackground } from './components/conways';
import ParallaxContainer from './layout/ParallaxContainer';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { NavigationProvider } from './contexts/NavigationContext';
import NavMenu from './layout/NavMenu';
import { useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh',
    height: '100vh', // Ensure it takes full viewport height
    overflowX: 'hidden', // Prevent horizontal scrolling
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    pointerEvents: 'none', // Allow clicks to pass through to the background
    '& > *': {
        pointerEvents: 'auto', // Re-enable pointer events for children
    },
    '& .MuiContainer-root, & .MuiBox-root': {
        pointerEvents: 'auto', // Ensure containers and boxes can be clicked
    },
}));

const App = () => {
    const mainContainerRef = useRef(null);

    return (
        <ThemeProvider theme={theme}>
            <ProjectsProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <NavigationProvider>
                                <MainContainer ref={mainContainerRef}>
                                    <PixiConwayBackground />
                                    <NavMenu />

                                    <SectionWrapper>
                                        <ParallaxContainer
                                            speed={0.15}
                                            className="section-container"
                                            id="home"
                                        >
                                            <HeroMain />
                                        </ParallaxContainer>
                                        <ParallaxContainer
                                            speed={0.2}
                                            className="section-container"
                                            id="about"
                                        >
                                            <AboutMain />
                                        </ParallaxContainer>
                                        <ParallaxContainer
                                            speed={0.25}
                                            className="section-container"
                                            id="projects"
                                        >
                                            <ProjectsMain />
                                        </ParallaxContainer>
                                        <ParallaxContainer
                                            speed={0.35}
                                            className="section-container"
                                            id="contact"
                                        >
                                            <ContactMain />
                                        </ParallaxContainer>
                                    </SectionWrapper>
                                </MainContainer>
                            </NavigationProvider>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProjectsProvider>
        </ThemeProvider>
    );
};

export default App;
