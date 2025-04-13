import React from 'react';
import { Typography, Box, Grid2 } from '@mui/material';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../../../../components/shared/AnimatedSection';
import aboutImage from '../../../../assets/section_header_imgs/about.webp';

import {
    MainSectionContainer,
    FrostedGlassContainer,
    SectionHeader,
    EnhancedTitle,
} from '../../../../components/shared/styles';

// Import the styles from HeroMain or create equivalent styles
import { HeroImage } from '../hero/HeroMain.styles';

const AboutMain = () => {
    return (
        <MainSectionContainer id="about">
            <AnimatedSection>
                <SectionHeader>
                    <HeroImage
                        src={aboutImage}
                        alt="About Section"
                        draggable={false}
                        style={{
                            animation: 'none',
                            filter: 'none',
                        }}
                    />

                    <Box className="header-overlay">
                        <EnhancedTitle variant="h2" className="header-title">
                            Who I Am
                        </EnhancedTitle>

                        <Typography variant="h6" className="header-description">
                            Full-stack developer and AI enthusiast focused on
                            building innovative digital experiences.
                        </Typography>
                    </Box>
                </SectionHeader>
            </AnimatedSection>
            <AnimatedSection>
                <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
                    <Grid2 size={{ xs: 12, md: 10, lg: 12 }}>
                        <AnimatedSection>
                            <FrostedGlassContainer sx={{ padding: 4 }}>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.02em',
                                        color: '#e5fcff',
                                        lineHeight: 1.8,
                                        fontSize: '1.05rem',
                                        fontWeight: 400,
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    I spend my days crafting AI agents and
                                    tinkering with MCP servers, finding joy in
                                    the full stack development process.
                                    Self-hosting has become both a passion and
                                    an endless learning opportunity for me. When
                                    working with LLMs, DSPy is my framework of
                                    choice for its elegant approach to prompt
                                    engineering. There's something incredibly
                                    satisfying about building systems that
                                    connect from the database all the way to the
                                    user interface, seeing all the pieces work
                                    together. I'm constantly exploring the
                                    intersection of AI capabilities and
                                    practical applications, believing that the
                                    most interesting innovations happen when we
                                    bridge theoretical potential with real-world
                                    needs.
                                </Typography>
                            </FrostedGlassContainer>
                        </AnimatedSection>
                    </Grid2>
                </Grid2>
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default AboutMain;
