import { styled } from '@mui/material/styles';
import { Box, Card, Paper, Tabs, Tab, Accordion, Button } from '@mui/material';

export const AiToolsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

export const AiToolsCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: `0 4px 30px ${theme.palette.background.shadow}`,
    border: `1px solid ${theme.palette.divider}`,
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
    color: theme.palette.text.primary,
    '&.Mui-selected': {
        color: theme.palette.text.secondary,
    },
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: '400px',
    overflowY: 'auto',
}));

export const AiToolsAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
}));

export const AiToolsApplyButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));
