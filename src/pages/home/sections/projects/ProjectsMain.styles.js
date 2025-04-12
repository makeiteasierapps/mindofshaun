import styled from '@emotion/styled';
import { Box, Button, IconButton, Typography } from '@mui/material';

export const ProjectsGrid = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    max-width: 1200px;
`;

export const NavigationControls = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    width: 100%;
`;

export const NavDot = styled(Button)`
    width: 12px;
    height: 12px;
    min-width: unset;
    padding: 0;
    border-radius: 50%;
    background-color: ${(props) =>
        props.active
            ? props.theme.palette.primary.main
            : 'rgba(255, 255, 255, 0.3)'};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) =>
            props.active
                ? props.theme.palette.primary.main
                : 'rgba(255, 255, 255, 0.5)'};
    }
`;

export const ProjectNavButton = styled(IconButton)`
    background-color: rgba(255, 255, 255, 0.05);
    color: ${(props) => props.theme.palette.secondary.light};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &.Mui-disabled {
        color: rgba(255, 255, 255, 0.2);
    }
`;

export const ProjectCounter = styled(Typography)`
    margin: 0 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
`;
