import { styled } from '@mui/material/styles';
import { Box, Card, Paper, Tabs, Tab, Accordion, Button } from '@mui/material';

export const AiToolsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

export const AiToolsCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
}));

export const AiToolsTabs = styled(Tabs)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiTab-root': {
        minWidth: 'auto',
        padding: theme.spacing(1, 2),
    },
}));

export const AiToolsTab = styled(Tab)(({ theme }) => ({
    fontSize: '0.875rem',
    textTransform: 'none',
}));

export const AiToolsContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const AiToolsForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export const AiToolsPreview = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
}));

export const AiToolsAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: 'none',
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 0,
    },
}));

export const AiToolsButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const AiToolsLoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
}));

export const AiToolsResultContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(255, 255, 255, 0.1)',
}));

export const AiToolsApplyButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));
