import React from 'react';
import { Typography, Box, Grid2 } from '@mui/material';
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
                            Full-stack and AI, from idea through deployment.
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
                                    I build software people use, and the
                                    systems that keep it running. That includes
                                    Family AHA, a daily family-connection app I
                                    designed and own, and a single-operator
                                    hosting platform that deploys full-stack
                                    apps with GitOps. I take an idea from the
                                    first prompt and architecture through the
                                    interface, the API, and a real deployment. I
                                    prefer tools that make everyday life easier:
                                    practical AI, clear systems, and software
                                    someone else can run.
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
