import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
    ProjectCard,
    ProjectContent,
    ProjectGallery,
    MainImageContainer,
    MainImage,
    ZoomButton,
    ThumbnailGrid,
    Thumbnail,
    ProjectTitle,
    ProjectLinks,
    ProjectLink,
    TagsContainer,
    ImageDescription,
    EnlargedImageModal,
    EnlargedImageContainer,
    EnlargedImage,
    CloseButton,
} from './Project.styles';
import { StyledChip } from '../../../../components/shared/styles';
const Project = ({ projectData, index }) => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState(0);
    const [enlargedImageOpen, setEnlargedImageOpen] = useState(false);

    // Handle both old and new data structures
    const projectDetails =
        projectData.project_details || projectData.ProjectDetails || {};
    const { images } = projectData;

    // Extract key technologies as tags from clientTech and serverTech
    const clientTech =
        projectDetails.clientTech || projectData.clientTech || [];
    const serverTech =
        projectDetails.serverTech || projectData.serverTech || [];
    const allTech = [...clientTech, ...serverTech];

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
    };

    const handleOpenEnlargedImage = () => {
        setEnlargedImageOpen(true);
    };

    const handleCloseEnlargedImage = () => {
        setEnlargedImageOpen(false);
    };

    return (
        <ProjectCard>
            <ProjectContent>
                <Box>
                    <ProjectTitle variant="h4">
                        {projectDetails.title}
                    </ProjectTitle>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.7,
                            fontSize: '1.1rem',
                        }}
                    >
                        {projectDetails.description}
                    </Typography>
                </Box>

                <TagsContainer>
                    {allTech.slice(0, 6).map((tag, i) => (
                        <StyledChip key={i} label={tag} size="small" />
                    ))}
                </TagsContainer>

                <ProjectLinks>
                    {projectDetails.clientCode && (
                        <ProjectLink
                            href={projectDetails.clientCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="github"
                        >
                            <GitHubIcon fontSize="small" />
                            Client Code
                        </ProjectLink>
                    )}

                    {projectDetails.serverCode && (
                        <ProjectLink
                            href={projectDetails.serverCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="github"
                        >
                            <GitHubIcon fontSize="small" />
                            Server Code
                        </ProjectLink>
                    )}

                    {projectDetails.liveDemo && (
                        <ProjectLink
                            href={projectDetails.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LaunchIcon fontSize="small" />
                            Live Demo
                        </ProjectLink>
                    )}
                </ProjectLinks>
            </ProjectContent>

            <ProjectGallery>
                <MainImageContainer>
                    <MainImage
                        src={images[selectedImage]?.image}
                        alt={images[selectedImage]?.alt || projectDetails.title}
                    />
                    <ZoomButton
                        onClick={handleOpenEnlargedImage}
                        aria-label="Enlarge image"
                        size="small"
                    >
                        <ZoomInIcon />
                    </ZoomButton>
                </MainImageContainer>

                {images[selectedImage]?.description && (
                    <ImageDescription>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'white',
                                fontWeight: 300,
                                letterSpacing: '0.3px',
                                lineHeight: 1.6,
                                textAlign: 'center',
                            }}
                        >
                            {images[selectedImage]?.description}
                        </Typography>
                    </ImageDescription>
                )}

                {images.length > 1 && (
                    <ThumbnailGrid>
                        {images.map((img, i) => (
                            <Thumbnail
                                key={i}
                                src={img.image}
                                alt={`Thumbnail ${i + 1}`}
                                selected={i === selectedImage}
                                onClick={() => handleThumbnailClick(i)}
                            />
                        ))}
                    </ThumbnailGrid>
                )}
            </ProjectGallery>

            <EnlargedImageModal
                open={enlargedImageOpen}
                onClose={handleCloseEnlargedImage}
                aria-labelledby="enlarged-image-modal"
            >
                <EnlargedImageContainer>
                    <CloseButton
                        onClick={handleCloseEnlargedImage}
                        size="small"
                    >
                        <CloseIcon />
                    </CloseButton>
                    <EnlargedImage
                        src={images[selectedImage]?.image}
                        alt={images[selectedImage]?.alt || projectDetails.title}
                    />
                </EnlargedImageContainer>
            </EnlargedImageModal>
        </ProjectCard>
    );
};

export default Project;
