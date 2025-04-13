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
                            mindofshaun.com
                        </EnhancedTitle>

                        <Typography variant="h6" className="header-description">
                            Digital systems, tools, and ideas — at the edge of
                            code and consciousness.
                        </Typography>
                    </Box>
                </SectionHeader>

                <CTAButtonContainer sx={{ mt: 3 }}>
                    <CTAButton href="/blog">BLOG ↗</CTAButton>
                    <CTAButton href="#projects">PROJECTS ↘</CTAButton>
                </CTAButtonContainer>
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default HeroMain;
