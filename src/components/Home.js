import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Button } from '@mui/material';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
// Remove the KeyboardArrowUpIcon import since we're not using it here anymore
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Import styled components from separate styles file
import {
    HolographicText,
    EnhancedBioText,
    ButtonContainer,
    HomeContainer,
} from './Home.styles';

const Home = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const contentRef = useRef(null);
    const theme = useTheme();
    // Remove showBackToTop state and related code

    // Animation for content overlay
    const contentAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: {
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0px)' : 'translateY(30px)',
        },
        config: { tension: 180, friction: 20 },
        delay: 200,
    });

    // Animation for heading
    const headingAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: {
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.9)',
        },
        config: { tension: 200, friction: 15 },
        delay: 500,
    });

    // Animation for bio
    const bioAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: inView ? 1 : 0 },
        config: { duration: 1000 },
        delay: 900,
    });

    // Animation for buttons
    const buttonAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: {
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0px)' : 'translateY(20px)',
        },
        config: config.gentle,
        delay: 1300,
    });

    return (
        <HomeContainer id="home" ref={ref}>
            <animated.div
                style={contentAnimation}
                ref={contentRef}
                className="content-area glow-border"
            >
                <Grid
                    container
                    spacing={{ xs: 3, sm: 4, md: 5 }}
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <HolographicText
                            style={headingAnimation}
                            gutterBottom
                            align="center"
                        >
                            mindofshaun.com — digital innovation
                        </HolographicText>
                    </Grid>

                    <Grid item xs={12} md={10} lg={8}>
                        <EnhancedBioText
                            style={{
                                ...bioAnimation,
                                filter: 'drop-shadow(0 0 8px rgba(0, 178, 181, 0.5))',
                                background: 'rgba(0, 12, 12, 0.7)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '10px',
                                padding: '25px',
                                boxShadow:
                                    '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 178, 181, 0.4) inset',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            align="center"
                        >

                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                I spend my days crafting AI agents and tinkering
                                with MCP servers, finding joy in the full stack
                                development process. Self-hosting has become
                                both a passion and an endless learning
                                opportunity for me. When working with LLMs, DSPy
                                is my framework of choice for its elegant
                                approach to prompt engineering. There's
                                something incredibly satisfying about building
                                systems that connect from the database all the
                                way to the user interface, seeing all the pieces
                                work together. I'm constantly exploring the
                                intersection of AI capabilities and practical
                                applications, believing that the most
                                interesting innovations happen when we bridge
                                theoretical potential with real-world needs.
                            </Box>
                        </EnhancedBioText>
                    </Grid>

                    <Grid item xs={12}>
                        <animated.div style={buttonAnimation}>
                            <ButtonContainer sx={{ justifyContent: 'center' }}>
                                <Button variant="contained" href="#projects">
                                    Projects
                                </Button>
                                <Button variant="contained" href="#blog">
                                    Blog
                                </Button>
                            </ButtonContainer>
                        </animated.div>
                    </Grid>
                </Grid>
            </animated.div>
        </HomeContainer>
    );
};

export default Home;
