import { styled } from '@mui/material/styles';
import { Box, Typography, Link, Modal, IconButton } from '@mui/material';
import { FrostedGlassBox } from '../../../../components/shared/styles';

// Styled components
export const ProjectCard = styled(FrostedGlassBox)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    '@media (min-width: 900px)': {
        flexDirection: 'row',
    },
}));

export const ProjectContent = styled(Box)(({ theme }) => ({
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

export const ProjectGallery = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (min-width: 900px)': {
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const MainImageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    position: 'relative',
}));

export const MainImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    borderRadius: '8px',
}));

export const ZoomButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
}));

export const ThumbnailGrid = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem',
}));

export const Thumbnail = styled('img')(({ theme, selected }) => ({
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

export const ProjectTitle = styled(Typography)(({ theme }) => ({
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

export const ProjectLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
    '@media (max-width: 900px)': {
        justifyContent: 'center',
    },
}));

export const ProjectLink = styled(Link)(({ theme, variant }) => ({
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

export const TagsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
    '@media (max-width: 900px)': {
        justifyContent: 'center',
    },
}));

export const ImageDescription = styled(Box)(({ theme }) => ({
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

export const EnlargedImageModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const EnlargedImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    outline: 'none',
}));

export const EnlargedImage = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
    borderRadius: '4px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
}));
