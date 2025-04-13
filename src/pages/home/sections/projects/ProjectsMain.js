import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Project from './Project';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SectionHeader } from '../../../../components/shared/styles';
import projectsImage from '../../../../assets/section_header_imgs/projects.webp';
import { AnimatedSection } from '../../../../components/shared/AnimatedSection';
import { HeroImage } from '../hero/HeroMain.styles';
import {
    ProjectsGrid,
    NavigationControls,
    ProjectNavButton,
    NavDot,
    ProjectCounter,
} from './ProjectsMain.styles';
import { MainSectionContainer, EnhancedTitle } from '../../../../components/shared/styles';
import { useProjects } from '../../../../contexts/ProjectsContext';

const ProjectsMain = () => {
    const [currentProject, setCurrentProject] = useState(0);
    const { loading, getPublishedProjects } = useProjects();

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

    return (
        <MainSectionContainer id="projects">
            <AnimatedSection>
                <SectionHeader>
                    <HeroImage
                        src={projectsImage}
                        alt="Projects Section"
                        draggable={false}
                        style={{
                            animation: 'none',
                            filter: 'none',
                            maskImage:
                                'radial-gradient(circle at center, black 50%, transparent 75%)',
                            WebkitMaskImage:
                                'radial-gradient(circle at center, black 50%, transparent 75%)',
                        }}
                    />
                    <Box className="header-overlay">
                        <EnhancedTitle variant="h2" className="header-title">
                            Things I've Built
                        </EnhancedTitle>

                        <Typography variant="h6" className="header-description">
                            These are some projects I've created for fun,
                            learning, and solving problems I've encountered.
                            Each represents a journey of exploration and
                            creativity.
                        </Typography>
                    </Box>
                </SectionHeader>
            </AnimatedSection>
            <AnimatedSection>
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
                                {currentProject + 1} /{' '}
                                {publishedProjects.length}
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
                ) : null}
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default ProjectsMain;
