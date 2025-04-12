import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import { Box, styled, Button } from '@mui/material';
import ProjectsMain from './pages/home/sections/projects/ProjectsMain';
import ContactMain from './pages/home/sections/contact/ContactMain';
import HeroMain from './pages/home/sections/hero/HeroMain';
import AboutMain from './pages/home/sections/about/AboutMain';
import { PixiConwayBackground } from './components/conways';
import ParallaxContainer from './layout/ParallaxContainer';
import BlogMain from './pages/home/sections/blog/BlogMain';
import { AuthProvider } from './contexts/AuthContext';
import { PostsProvider } from './contexts/PostsContext';
import { ProjectsProvider } from './contexts/ProjectsContext';
import ContentManager from './pages/admin/ContentManager';
import NavMenu from './layout/NavMenu';
import { useRef } from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from 'react-router-dom';
import SinglePostView from './pages/home/sections/blog/components/SinglePostView';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';

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

    const location = useLocation();
    const navigate = useNavigate();

    // Handle admin button click - use navigation instead of state
    const handleAdminClick = () => {
        navigate('/login');
    };

    // Handle admin logout - return to main page
    const handleAdminLogout = () => {
        navigate('/');
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <PostsProvider>
                    <ProjectsProvider>
                        <Routes>
                            {/* Login Route */}
                            <Route path="/login" element={<Login />} />

                            {/* Protected Admin Routes */}
                            <Route
                                path="/admin/*"
                                element={
                                    <ProtectedRoute>
                                        <ContentManager
                                            onLogout={handleAdminLogout}
                                        />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/blog/:postId"
                                element={<SinglePostView />}
                            />
                            <Route
                                path="/"
                                element={
                                    <MainContainer ref={mainContainerRef}>
                                        <PixiConwayBackground />
                                        <NavMenu />

                                        {/* Hidden Admin Button */}
                                        <Button
                                            variant="outlined"
                                            onClick={handleAdminClick}
                                            sx={{
                                                position: 'fixed',
                                                bottom: '20px',
                                                left: '20px',
                                                zIndex: 1000,
                                                opacity: 0, // Hidden but still clickable
                                                background: 'transparent',
                                                border: 'none',
                                                width: '50px',
                                                height: '50px',
                                                minWidth: 'unset',
                                                '&:hover': {
                                                    background: 'transparent',
                                                    border: 'none',
                                                },
                                            }}
                                            aria-label="Admin Access"
                                        />

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
                                                speed={0.3}
                                                className="section-container"
                                                id="blog"
                                            >
                                                <BlogMain />
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
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </ProjectsProvider>
                </PostsProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
