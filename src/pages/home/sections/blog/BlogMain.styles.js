import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const TagsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));
