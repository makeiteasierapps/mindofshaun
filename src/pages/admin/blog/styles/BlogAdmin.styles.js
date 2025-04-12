import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const GlassmorphicCard = styled(Card)(({ theme }) => ({
    background: theme.palette.background.paper,
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 8px 32px ${theme.palette.background.shadow}`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',
    margin: theme.spacing(2, 0),
}));

export const AdminContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '1200px',
    margin: '0 auto',
}));

export const AdminHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const TagsInput = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
}));
