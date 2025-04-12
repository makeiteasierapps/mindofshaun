import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const AdminContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
}));

export const AdminHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(3),
}));
