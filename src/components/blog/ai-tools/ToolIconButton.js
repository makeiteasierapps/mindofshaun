import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';

const ToolIconButton = ({
    id,
    title,
    onClick,
    icon,
    hasResults,
    isActive,
    onToggle,
}) => {
    const theme = useTheme();

    const handleClick = () => {
        if (hasResults) {
            // Toggle this tool as the active one
            onToggle(id);
        } else {
            // No results yet, run the tool
            onClick();
        }
    };

    // Clone the icon element with explicit color styling
    const styledIcon = React.cloneElement(icon, {
        sx: {
            color: hasResults
                ? theme.palette.primary.light
                : theme.palette.text.primary,
            fontSize: '1.5rem',
        },
    });

    return (
        <Tooltip title={title}>
            <IconButton
                onClick={handleClick}
                sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid',
                    borderColor: isActive
                        ? theme.palette.primary.main
                        : hasResults
                        ? theme.palette.primary.light
                        : theme.palette.divider,
                    backgroundColor: isActive
                        ? 'rgba(0, 178, 181, 0.1)'
                        : theme.palette.background.paper,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 178, 181, 0.1)',
                    },
                }}
            >
                {styledIcon}
            </IconButton>
        </Tooltip>
    );
};

ToolIconButton.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    hasResults: PropTypes.bool,
    isActive: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
};

ToolIconButton.defaultProps = {
    hasResults: false,
    isActive: false,
};

export default ToolIconButton;
