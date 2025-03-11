import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const GlassmorphicCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    margin: theme.spacing(2, 0),
}));

export const BlogContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
}));

export const BlogHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const SecretLoginButton = styled(Box)(({ theme }) => ({
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    backgroundColor: 'white',
    opacity: 0.1,
    '&:hover': {
        opacity: 0.3,
    },
}));

export const TagsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));
