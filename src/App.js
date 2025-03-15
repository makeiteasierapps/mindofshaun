import { ThemeProvider } from '@mui/material/styles';
import { theme } from './contexts/theme';
import { Box, styled, Fab, Button } from '@mui/material';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import Home from './components/Home';
import { PixiConwayBackground } from './components/pixi';
import ParallaxContainer from './components/ParallaxContainer';
import Blog from './components/blog/core/Blog';
import { AuthProvider } from './contexts/AuthContext';
import { PostsProvider } from './components/blog/context/PostsContext';
import { ProjectsProvider } from './contexts/ProjectsContext';
import ContentManager from './components/admin/ContentManager';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useLayoutEffect,
} from 'react';

const MainContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh',
    height: '100vh', // Ensure it takes full viewport height
    overflowX: 'hidden', // Prevent horizontal scrolling
    overflowY: 'auto',
    scrollBehavior: 'smooth', // Smooth scrolling for all
    scrollSnapType: 'y proximity', // Use proximity instead of mandatory for more natural scrolling
    scrollPadding: '20px', // Add some padding for better snap behavior
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 178, 181, 0.3)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(0, 178, 181, 0.5)',
    },
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

// Navigation menu container that appears on hover
const NavMenuContainer = styled(Box)(({ theme }) => ({
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
const NavMenu = styled(Box)(({ theme }) => ({
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

const ScrollToTopButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    background: 'rgba(0, 178, 181, 0.2)',
    color: 'rgba(229, 252, 255, 0.7)',
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
}));

const AdminButton = styled(Button)(({ theme }) => ({
    background: 'rgba(0, 178, 181, 0.2)',
    color: 'rgba(229, 252, 255, 0.7)',
    boxShadow: '0 2px 5px rgba(0, 178, 181, 0.3)',
    border: '1px solid rgba(0, 178, 181, 0.2)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        background: 'rgba(0, 178, 181, 0.4)',
        boxShadow: '0 3px 8px rgba(0, 178, 181, 0.4)',
    },
}));

const App = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [showAdmin, setShowAdmin] = useState(false);
    const mainContainerRef = useRef(null);
    const sectionRefs = useRef([]);
    const sectionNames = ['Home', 'Projects', 'Blog', 'Contact'];
    const scrollTimeoutRef = useRef(null);
    const checkActiveSectionRef = useRef(null); // Ref to store the function
    const isScrollingRef = useRef(false); // Track if we're currently scrolling programmatically

    // Function to scroll to top with improved behavior
    const scrollToTop = () => {
        // Use the scrollToSection function to scroll to the first section
        scrollToSection(0);
    };

    // Function to scroll to a specific section with improved behavior
    const scrollToSection = (index) => {
        if (sectionRefs.current[index]) {
            // First update the active section state immediately
            setActiveSection(index);

            // Set the scrolling flag
            isScrollingRef.current = true;

            // Then scroll to the section
            sectionRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            // Clear any pending scroll detection
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Reset the scrolling flag after animation completes
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 1000); // Typical smooth scroll takes about 1s
        }
    };

    // Function to check which section is active
    const checkActiveSection = useCallback(() => {
        // Skip detection if we're currently scrolling programmatically
        if (isScrollingRef.current) {
            console.log(
                'Skipping active section detection during programmatic scrolling'
            );
            return;
        }

        if (!mainContainerRef.current || sectionRefs.current.length === 0)
            return;

        // Get the viewport height and scroll position
        const viewportHeight = window.innerHeight;
        const scrollY = mainContainerRef.current.scrollTop;

        // Track the best section and its score
        let bestSection = 0;
        let bestScore = -Infinity;

        // Simple approach: find which section occupies most of the viewport
        sectionRefs.current.forEach((section, index) => {
            if (!section) return;

            // Get section position relative to the viewport
            const rect = section.getBoundingClientRect();

            // Calculate how much of the section is visible in the viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Calculate visibility as a percentage of the viewport height
            const viewportVisibilityPercentage = visibleHeight / viewportHeight;

            // Calculate visibility as a percentage of the section height
            const sectionVisibilityPercentage = visibleHeight / rect.height;

            // Calculate how close the section is to being centered in the viewport
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
            const normalizedCenterPosition = Math.max(
                0,
                1 - distanceFromCenter / (viewportHeight / 2)
            );

            // Calculate a combined score that favors sections that:
            // 1. Take up more of the viewport
            // 2. Have more of their content visible
            // 3. Are closer to the center of the viewport
            const viewportWeight = 0.4;
            const sectionWeight = 0.3;
            const centerWeight = 0.3;

            const score =
                viewportVisibilityPercentage * viewportWeight +
                sectionVisibilityPercentage * sectionWeight +
                normalizedCenterPosition * centerWeight;

            // Debug logging
            console.log(
                `Section ${index} (${
                    sectionNames[index]
                }): viewportVis=${viewportVisibilityPercentage.toFixed(
                    2
                )}, sectionVis=${sectionVisibilityPercentage.toFixed(
                    2
                )}, center=${normalizedCenterPosition.toFixed(
                    2
                )}, score=${score.toFixed(2)}`
            );

            // If this section has a better score, make it the active one
            if (score > bestScore) {
                bestScore = score;
                bestSection = index;
            }
        });

        // Only update if we have a good enough score or if forced
        if (activeSection !== bestSection && bestScore > 0.1) {
            console.log(
                `Changing active section from ${activeSection} to ${bestSection} with score ${bestScore.toFixed(
                    2
                )}`
            );
            setActiveSection(bestSection);
        }
    }, [activeSection, sectionNames]); // Add sectionNames as a dependency

    // Store the function in the ref
    useEffect(() => {
        checkActiveSectionRef.current = checkActiveSection;
    }, [checkActiveSection]);

    // Debounced function to check active section
    const debouncedCheckActiveSection = useCallback(() => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            if (checkActiveSectionRef.current) {
                checkActiveSectionRef.current();
            }
        }, 50); // 50ms debounce time
    }, []); // No dependencies needed since we're using the ref

    // Handle scroll events
    const handleScroll = useCallback(() => {
        // Skip if we're programmatically scrolling
        if (isScrollingRef.current) return;

        // Call the debounced function
        debouncedCheckActiveSection();
    }, [debouncedCheckActiveSection]);

    // Initialize section refs
    useEffect(() => {
        // Longer delay to ensure all components are fully rendered
        const timer = setTimeout(() => {
            // Get all section containers
            const sections = Array.from(
                document.querySelectorAll('.section-container')
            );
            sectionRefs.current = sections;

            // Log for debugging
            console.log('Section refs initialized:', sections.length);
            sections.forEach((section, index) => {
                console.log(
                    `Section ${index}: id=${section.id}, offsetTop=${section.offsetTop}`
                );
            });

            // Initial check for active section
            if (
                mainContainerRef.current &&
                sections.length > 0 &&
                checkActiveSectionRef.current
            ) {
                checkActiveSectionRef.current();
            }
        }, 300); // Longer delay to ensure DOM is ready

        return () => clearTimeout(timer);
    }, []); // No dependencies needed since we're using the ref

    // Update active section based on scroll position and window resize
    useEffect(() => {
        const handleScroll = () => {
            // Skip if we're programmatically scrolling
            if (isScrollingRef.current) return;

            // Call the debounced function
            debouncedCheckActiveSection();
        };

        const handleResize = () => {
            // Recalculate active section on resize
            debouncedCheckActiveSection();
        };

        const container = mainContainerRef.current;
        if (container) {
            // Add scroll listener to the container
            container.addEventListener('scroll', handleScroll, {
                passive: true,
            });

            // Also listen for window scroll events in case the container doesn't capture all scrolls
            window.addEventListener('scroll', handleScroll, {
                passive: true,
            });

            // Add resize listener
            window.addEventListener('resize', handleResize, {
                passive: true,
            });

            // Initial check with a delay to ensure everything is rendered
            setTimeout(() => {
                if (checkActiveSectionRef.current) {
                    checkActiveSectionRef.current();
                }
            }, 500);

            return () => {
                container.removeEventListener('scroll', handleScroll);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
            };
        }
    }, [debouncedCheckActiveSection]); // Only depend on debouncedCheckActiveSection

    // Use layout effect to ensure proper initialization
    useLayoutEffect(() => {
        // Make sure the container is scrollable
        if (mainContainerRef.current) {
            mainContainerRef.current.style.overflowY = 'auto';

            // Initial scroll to the active section
            if (sectionRefs.current[activeSection]) {
                sectionRefs.current[activeSection].scrollIntoView({
                    behavior: 'auto',
                    block: 'start',
                });
            }
        }
    }, [activeSection]);

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <PostsProvider>
                    <ProjectsProvider>
                        {showAdmin && (
                            <ContentManager
                                onLogout={() => setShowAdmin(false)}
                            />
                        )}
                        <MainContainer
                            ref={mainContainerRef}
                            onScroll={handleScroll}
                        >
                            <PixiConwayBackground />

                            <ScrollToTopButton
                                onClick={scrollToTop}
                                aria-label="scroll to top"
                                size="medium"
                                sx={{
                                    opacity: activeSection > 0 ? 1 : 0,
                                    pointerEvents:
                                        activeSection > 0 ? 'auto' : 'none',
                                }}
                            >
                                <KeyboardArrowUpIcon />
                            </ScrollToTopButton>

                            <AdminButton
                                variant="outlined"
                                onClick={() => setShowAdmin(true)}
                                sx={{
                                    position: 'fixed',
                                    bottom: '20px',
                                    left: '20px',
                                    zIndex: 1000,
                                    opacity: 0.7,
                                    '&:hover': {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Admin
                            </AdminButton>

                            <NavMenuContainer>
                                <NavMenu>
                                    {sectionNames.map((name, index) => (
                                        <NavMenuItem
                                            key={index}
                                            active={activeSection === index}
                                            onClick={() =>
                                                scrollToSection(index)
                                            }
                                        >
                                            {name}
                                        </NavMenuItem>
                                    ))}
                                </NavMenu>
                            </NavMenuContainer>

                            <SectionWrapper>
                                <ParallaxContainer
                                    speed={0.15}
                                    className="section-container"
                                    id="section-0"
                                >
                                    <Home />
                                </ParallaxContainer>
                                <ParallaxContainer
                                    speed={0.25}
                                    className="section-container"
                                    id="section-1"
                                >
                                    <Projects />
                                </ParallaxContainer>
                                <ParallaxContainer
                                    speed={0.3}
                                    className="section-container"
                                    id="section-2"
                                >
                                    <Blog />
                                </ParallaxContainer>
                                <ParallaxContainer
                                    speed={0.35}
                                    className="section-container"
                                    id="section-3"
                                >
                                    <ContactMe />
                                </ParallaxContainer>
                            </SectionWrapper>
                        </MainContainer>
                    </ProjectsProvider>
                </PostsProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
