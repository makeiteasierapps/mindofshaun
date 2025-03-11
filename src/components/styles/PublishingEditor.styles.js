import { styled } from '@mui/material/styles';
import { Box, Card, Button, Paper } from '@mui/material';

export const PublishingCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: theme.spacing(3),
}));

export const TitleOption = styled(Button)(({ theme, selected }) => ({
    textAlign: 'left',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
    backgroundColor: selected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
    '&:hover': {
        backgroundColor: selected
            ? 'rgba(0, 0, 0, 0.12)'
            : 'rgba(0, 0, 0, 0.04)',
    },
    borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : 'none',
    borderRadius: 0,
}));

export const ContentPreview = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: theme.shape.borderRadius,
    maxHeight: '300px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.2),
    fontWeight: 'bold',
}));
