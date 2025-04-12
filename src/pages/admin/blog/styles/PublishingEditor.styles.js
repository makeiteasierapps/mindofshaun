import { styled } from '@mui/material/styles';
import { Box, Card, Button, Paper } from '@mui/material';

export const PublishingCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.background.paper,
    opacity: 0.7,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

export const TitleOption = styled(Button)(({ theme, selected }) => ({
    textAlign: 'left',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
    backgroundColor: selected ? theme.palette.action.selected : 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: selected
            ? theme.palette.action.selectedOpacity
            : theme.palette.action.hover,
        color: theme.palette.text.hover,
    },
    borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : 'none',
    borderRadius: 0,
}));

export const ContentPreview = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    maxHeight: '300px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    boxShadow: `0px 4px 12px ${theme.palette.background.shadow}`,
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.2),
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));
