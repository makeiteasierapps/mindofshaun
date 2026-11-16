import React from 'react';
import { Typography, Box } from '@mui/material';
import { AnimatedSection } from '../../../../components/shared/AnimatedSection';
import heroImage from '../../../../assets/section_header_imgs/hero.webp';
import { EnhancedTitle } from '../../../../components/shared/styles';
import { HeroImage, CTAButton, CTAButtonContainer } from './HeroMain.styles';

import {
    MainSectionContainer,
    SectionHeader,
} from '../../../../components/shared/styles';

const HeroMain = () => {
    return (
        <MainSectionContainer id="home">
            <AnimatedSection>
                <SectionHeader>
                    <HeroImage
                        src={heroImage}
                        alt="Mindscape"
                        draggable={false}
                        style={{ filter: 'none' }}
                    />

                    <Box className="header-overlay">
                        <EnhancedTitle
                            className="header-title"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                    md: '3rem',
                                    lg: '3.75rem',
                                },
                            }}
                        >
                            Shaun Offenbacher
                        </EnhancedTitle>

                        <Typography variant="h6" className="header-description">
                            I build AI-powered apps and the systems that host
                            them.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#e5fcff',
                                maxWidth: '640px',
                                margin: '0 auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Full-stack product work, practical AI, and GitOps
                            hosting — from a prompt or an architecture sketch
                            through a running deployment.
                        </Typography>
                    </Box>
                </SectionHeader>

                <CTAButtonContainer sx={{ mt: 3 }}>
                    <CTAButton href="#contact">Let's work together</CTAButton>
                    <CTAButton href="#projects">View projects</CTAButton>
                </CTAButtonContainer>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        mt: 2,
                        '& a': {
                            color: '#e5fcff',
                            textDecoration: 'none',
                        },
                    }}
                >
                    <a
                        href="https://github.com/makeiteasierapps"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shaun-o-940b591b5/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a href="mailto:shaunoffenbacher@yahoo.com">Email</a>
                </Box>
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default HeroMain;
