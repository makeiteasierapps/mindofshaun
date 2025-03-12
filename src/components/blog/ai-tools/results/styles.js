import { styled } from '@mui/material/styles';
import { Paper, Box, Chip } from '@mui/material';

// Common paper container for sections
export const SectionPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
}));

// Paper container for main content sections
export const ContentPaper = styled(SectionPaper)(({ theme }) => ({
    // Same as SectionPaper but can be extended if needed
}));

// Container for selected text
export const ContentSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    backgroundColor: 'rgba(0, 178, 181, 0.05)',
    borderRadius: theme.shape.borderRadius,
    border: `1px dashed ${theme.palette.primary.light}`,
}));

// Styled chip for word suggestions
export const WordChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: 'rgba(0, 178, 181, 0.1)',
    borderColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
}));

// Container for tab icons
export const TabIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
        marginRight: theme.spacing(1),
        fontSize: '1.2rem',
    },
}));

// Styled button for title options
export const TitleOption = styled(Box)(({ theme, selected }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: selected ? 'rgba(0, 178, 181, 0.1)' : 'transparent',
    border: selected
        ? `1px solid ${theme.palette.primary.light}`
        : '1px solid transparent',
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 178, 181, 0.05)',
    },
}));
