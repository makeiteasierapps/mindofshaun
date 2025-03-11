import React from 'react';
import { useTheme } from '@mui/material/styles';
import {Typography, Box, Container, Grid2} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const AnimatedBox = styled(animated(Box))(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
}));

const PageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100vh',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing(3),
}));

const NameTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginTop: theme.spacing(2),
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontStyle: 'italic',
    marginBottom: theme.spacing(3),
}));

const BioTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    '@media (max-width: 600px)': {
        fontSize: '0.9rem',
    },
}));

const Home = () => {
    const [ref, inView] = useInView();
    const theme = useTheme();

    const props = useSpring({
        from: { opacity: 0, height: '0%' },
        to: { opacity: inView ? 1 : 0, height: inView ? '100%' : '0%' },
        config: { tension: 210, friction: 20 },
    });

    return (
        <PageContainer id="home" maxWidth={false}>
            <AnimatedBox ref={ref} style={props}>
                <Container>
                    <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction={{ xs: 'column', md: 'row-reverse' }}
                    >
                        <Grid2>
                            <NameTypography variant="h3">
                                Shaun Offenbacher
                            </NameTypography>
                            <SubtitleTypography variant="h6">
                                Software Engineer & AI Enthusiast
                            </SubtitleTypography>
                            <BioTypography variant="body1">
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
                            </BioTypography>
                        </Grid2>
                    </Grid2>
                </Container>
            </AnimatedBox>
        </PageContainer>
    );
};

export default Home;
