import { styled } from '@mui/material/styles';
import { Box, Paper, Button, IconButton } from '@mui/material';

export const EditorContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 200px)',
    minHeight: '500px',
    position: 'relative',
}));

export const ContentEditor = styled('textarea')(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.1rem',
    lineHeight: 1.6,
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
}));

export const SidebarToggle = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1300,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    borderRadius: '50% 0 0 50%',
    padding: '8px 8px 8px 12px',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export const SidebarContent = styled(Box)(({ theme }) => ({
    width: '350px',
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const ToolButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export const PreviewContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    overflowY: 'auto',
}));

export const PublishButton = styled(Button)(({ theme }) => ({
    marginTop: 'auto',
    padding: theme.spacing(1.5),
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export const ResultPreview = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    maxHeight: '200px',
    overflowY: 'auto',
}));
