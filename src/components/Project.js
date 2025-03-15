import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    Chip,
} from '@mui/material';
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

const Project = ({ projectData, index }) => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState(0);
    const [enlargedImageOpen, setEnlargedImageOpen] = useState(false);

    const { ProjectDetails, images } = projectData;

    // Extract key technologies as tags from clientTech and serverTech
    const allTech = [...projectData.clientTech, ...projectData.serverTech];
    const techTags = allTech.map((tech) => tech.name);

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
                        {ProjectDetails.title}
                    </ProjectTitle>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.7,
                            fontSize: '1.1rem',
                        }}
                    >
                        {ProjectDetails.description}
                    </Typography>
                </Box>

                <TagsContainer>
                    {techTags.slice(0, 6).map((tag, i) => (
                        <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': {
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.12)',
                                },
                            }}
                        />
                    ))}
                </TagsContainer>

                <ProjectLinks>
                    {ProjectDetails.clientCode && (
                        <ProjectLink
                            href={ProjectDetails.clientCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="github"
                        >
                            <GitHubIcon fontSize="small" />
                            Client Code
                        </ProjectLink>
                    )}

                    {ProjectDetails.serverCode && (
                        <ProjectLink
                            href={ProjectDetails.serverCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="github"
                        >
                            <GitHubIcon fontSize="small" />
                            Server Code
                        </ProjectLink>
                    )}

                    {ProjectDetails.liveDemo && (
                        <ProjectLink
                            href={ProjectDetails.liveDemo}
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
                        src={images[selectedImage].image}
                        alt={images[selectedImage].alt || ProjectDetails.title}
                    />
                    <ZoomButton
                        onClick={handleOpenEnlargedImage}
                        aria-label="Enlarge image"
                        size="small"
                    >
                        <ZoomInIcon />
                    </ZoomButton>
                </MainImageContainer>

                {images[selectedImage].description && (
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
                            {images[selectedImage].description}
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
                        src={images[selectedImage].image}
                        alt={images[selectedImage].alt || ProjectDetails.title}
                    />
                </EnlargedImageContainer>
            </EnlargedImageModal>
        </ProjectCard>
    );
};

export default Project;
