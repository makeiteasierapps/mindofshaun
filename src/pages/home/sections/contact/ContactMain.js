import React from 'react';
import { Button, Box, IconButton, Typography, Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { SectionHeader } from '../../../../components/shared/styles';
import { HeroImage } from '../hero/HeroMain.styles';
import contactImage from '../../../../assets/section_header_imgs/connect.webp';
import { AnimatedSection } from '../../../../components/shared/AnimatedSection';
import {
    FrostedGlassBox,
    MainSectionContainer,
    EnhancedTitle,
} from '../../../../components/shared/styles';

const SocialIconWrapper = styled(IconButton)(({ theme }) => ({
    fontSize: '4em',
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease, color 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        color: theme.palette.text.hover,
    },
}));

const socialLinks = [
    {
        href: 'https://www.linkedin.com/in/shaun-o-940b591b5/',
        Icon: LinkedInIcon,
    },
    {
        href: 'https://github.com/makeiteasierapps',
        Icon: GitHubIcon,
    },
    {
        href: 'https://twitter.com/makeiteasier_',
        Icon: XIcon,
    },
];

const SocialLink = ({ href, Icon }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <SocialIconWrapper>
                <Icon fontSize="inherit" />
            </SocialIconWrapper>
        </a>
    );
};

const ContactMain = () => {
    const handleOpenMail = () => {
        window.location.href = 'mailto:shaunoffenbacher@yahoo.com';
    };

    return (
        <MainSectionContainer id="contact">
            <AnimatedSection>
                <SectionHeader>
                    <HeroImage
                        src={contactImage}
                        alt="Contact Section"
                        draggable={false}
                        style={{
                            marginBottom: 0,
                            filter: 'none',
                            maskImage:
                                'radial-gradient(circle at center, black 50%, transparent 75%)',
                            WebkitMaskImage:
                                'radial-gradient(circle at center, black 50%, transparent 75%)',
                            animation: 'none',
                        }}
                    />
                    <Box className="header-overlay">
                        <EnhancedTitle variant="h2" className="header-title">
                            Let's Connect!
                        </EnhancedTitle>

                        <Typography variant="h6" className="header-description">
                            I'm always looking for new opportunities to learn
                            and grow. If you have any questions or would like to
                            get in touch, please don't hesitate to reach out.
                        </Typography>
                    </Box>
                </SectionHeader>
            </AnimatedSection>

            <AnimatedSection>
                <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
                    <Grid2 size={{ xs: 12, md: 10, lg: 8 }}>
                        <FrostedGlassBox
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            padding={6}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={4}
                                mb={6}
                            >
                                {socialLinks.map((link, index) => (
                                    <SocialLink {...link} />
                                ))}
                            </Box>

                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenMail}
                                >
                                    shaunoffenbacher@yahoo.com
                                </Button>
                            </Box>
                        </FrostedGlassBox>
                    </Grid2>
                </Grid2>
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default ContactMain;
