import { styled } from '@mui/material/styles';
import {
    Paper,
    Box,
    Typography,
    Grid2,
    TextField,
} from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: `0 4px 20px ${theme.palette.background.shadow}`,
}));

export const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.paper,
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },
}));

export const ImagePreviewGrid = styled(Grid2)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const ImagePreview = styled('img')({
    width: '100%',
    height: 150,
    objectFit: 'contain',
    marginBottom: 8,
});

export const ImagePreviewPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

export const PreviewImage = styled('img')({
    width: '100%',
    height: 150,
    objectFit: 'contain',
    marginBottom: 8,
});

export const ImageDescription = styled(Typography)(({ theme }) => ({
    flex: 1,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
}));

export const ImageActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    gap: theme.spacing(1),
}));

export const ImageUploadBox = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    padding: theme.spacing(4),
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.action.hover,
    },
}));

export const TechnologyInputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
}));

export const TechnologyTextField = styled(TextField)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

export const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.divider}`,
}));
