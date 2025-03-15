import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Project from './Project';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { HolographicText } from './Home.styles';
import { useProjects } from '../contexts/ProjectsContext';

const ProjectsContainer = styled(Container)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.light,
    padding: theme.spacing(6, 2),
    position: 'relative',
    transition: 'transform 0.3s ease-out',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        minHeight: '100vh',
        padding: theme.spacing(4, 1),
    },
}));

const ProjectsHeader = styled(Box)(({ theme }) => ({
    marginBottom: '3rem',
    textAlign: 'center',
    maxWidth: '800px',
}));

const ProjectsGrid = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    width: '100%',
    maxWidth: '1200px',
}));

const NavigationControls = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '3rem',
    width: '100%',
}));

const NavDot = styled(Button)(({ theme, active }) => ({
    width: '12px',
    height: '12px',
    minWidth: 'unset',
    padding: 0,
    borderRadius: '50%',
    backgroundColor: active
        ? theme.palette.primary.main
        : 'rgba(255, 255, 255, 0.3)',
    '&:hover': {
        backgroundColor: active
            ? theme.palette.primary.main
            : 'rgba(255, 255, 255, 0.5)',
    },
    transition: 'all 0.2s ease',
}));

const ProjectNavButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: theme.palette.secondary.light,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.2)',
    },
}));

const ProjectCounter = styled(Typography)(({ theme }) => ({
    margin: '0 1rem',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    width: '100%',
}));

const Projects = () => {
    const theme = useTheme();
    const [currentProject, setCurrentProject] = useState(0);
    const { projects, loading, getPublishedProjects } = useProjects();

    const publishedProjects = getPublishedProjects();

    const handleProjectChange = (index) => {
        setCurrentProject(index);
    };

    const goToNextProject = () => {
        setCurrentProject((prev) =>
            prev === publishedProjects.length - 1 ? prev : prev + 1
        );
    };

    const goToPreviousProject = () => {
        setCurrentProject((prev) => (prev === 0 ? prev : prev - 1));
    };

    if (loading) {
        return (
            <ProjectsContainer id="projects" maxWidth={false}>
                <ProjectsHeader>
                    <HolographicText>Things I've Built</HolographicText>
                </ProjectsHeader>
                <LoadingContainer>
                    <CircularProgress color="primary" />
                </LoadingContainer>
            </ProjectsContainer>
        );
    }

    return (
        <ProjectsContainer id="projects" maxWidth={false}>
            <ProjectsHeader>
                <HolographicText>Things I've Built</HolographicText>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    These are some projects I've created for fun, learning, and
                    solving problems I've encountered. Each represents a journey
                    of exploration and creativity.
                </Typography>
            </ProjectsHeader>

            <ProjectsGrid>
                {publishedProjects.map((project, index) => (
                    <Box
                        key={index}
                        sx={{
                            display:
                                currentProject === index ? 'block' : 'none',
                            width: '100%',
                        }}
                    >
                        <Project projectData={project} index={index} />
                    </Box>
                ))}
            </ProjectsGrid>

            {publishedProjects.length > 1 ? (
                <NavigationControls>
                    <ProjectNavButton
                        onClick={goToPreviousProject}
                        disabled={currentProject === 0}
                        aria-label="Previous project"
                    >
                        <ArrowBackIosNewIcon />
                    </ProjectNavButton>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {publishedProjects.map((_, index) => (
                            <NavDot
                                key={index}
                                active={currentProject === index}
                                onClick={() => handleProjectChange(index)}
                                aria-label={`View project ${index + 1}`}
                                sx={{ mx: 0.5 }}
                            />
                        ))}
                        <ProjectCounter>
                            {currentProject + 1} / {publishedProjects.length}
                        </ProjectCounter>
                    </Box>

                    <ProjectNavButton
                        onClick={goToNextProject}
                        disabled={
                            currentProject === publishedProjects.length - 1
                        }
                        aria-label="Next project"
                    >
                        <ArrowForwardIosIcon />
                    </ProjectNavButton>
                </NavigationControls>
            ) : publishedProjects.length === 0 ? (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: '2rem',
                        opacity: 0.7,
                        fontStyle: 'italic',
                    }}
                >
                    No projects available yet. Check back soon!
                </Typography>
            ) : (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: '2rem',
                        opacity: 0.7,
                        fontStyle: 'italic',
                    }}
                >
                    Project navigation will appear when you add more projects.
                </Typography>
            )}
        </ProjectsContainer>
    );
};

export default Projects;
