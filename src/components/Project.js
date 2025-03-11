import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    styled,
    useMediaQuery,
    Button,
    Chip,
    Link,
    Modal,
    IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

// Styled components
const ProjectCard = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    '@media (min-width: 900px)': {
        flexDirection: 'row',
    },
}));

const ProjectContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 900px)': {
        textAlign: 'center',
    },
}));
const ProjectGallery = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (min-width: 900px)': {
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const MainImageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    position: 'relative',
}));

const MainImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    borderRadius: '8px',
    filter: `drop-shadow(0 0px 10px ${theme.palette.background.shadow})`,
}));

const ZoomButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
}));

const ThumbnailGrid = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem',
}));

const Thumbnail = styled('img')(({ theme, selected }) => ({
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
    opacity: selected ? 1 : 0.6,
    border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
        opacity: 1,
        transform: 'translateY(-2px)',
    },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: '0.5rem',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: 0,
        width: '40px',
        height: '3px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
    },
    '@media (max-width: 900px)': {
        '&::after': {
            left: '50%', // Center the underline
            transform: 'translateX(-50%)', // Adjust for center alignment
        },
    },
}));

const ProjectLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
    '@media (max-width: 900px)': {
        justifyContent: 'center',
    },
}));

const ProjectLink = styled(Link)(({ theme, variant }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: variant === 'github' ? '#f8f8f8' : theme.palette.primary.main,
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    backgroundColor:
        variant === 'github' ? '#24292e' : 'rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor:
            variant === 'github' ? '#2f363d' : 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
    '@media (max-width: 900px)': {
        justifyContent: 'center',
    },
}));

const ImageDescription = styled(Box)(({ theme }) => ({
    background: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(8px)',
    padding: '16px 24px',
    marginTop: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    width: '100%',
    maxHeight: '100px',
    minHeight: '100px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
        },
    },
}));

const EnlargedImageModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const EnlargedImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    outline: 'none',
}));

const EnlargedImage = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
    borderRadius: '4px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
}));

const Project = ({ projectData, index }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:900px)');
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
