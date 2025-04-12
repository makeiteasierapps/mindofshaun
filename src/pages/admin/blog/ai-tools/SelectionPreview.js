import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    FormControlLabel,
    Switch,
    Paper,
} from '@mui/material';
import styled from '@mui/material/styles/styled';

const SelectionContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    elevation: 3,
    borderRadius: theme.shape.borderRadius,
    border: `1px dashed ${theme.palette.primary.light}`,
    maxHeight: '300px',
    height: '100%',
    overflowY: 'auto',
}));

/**
 * Component to display and manage text selection
 * @param {Object} props - Component props
 * @param {string} props.selectedText - The selected text
 * @param {boolean} props.useSelectedTextOnly - Whether to use only the selected text
 * @param {Function} props.onToggleUseSelectedTextOnly - Function to toggle using selected text only
 * @returns {JSX.Element|null} - The rendered component or null if no text is selected
 */
const SelectionPreview = ({ selectedText }) => {
    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Selected Text
            </Typography>
            <SelectionContainer>
                <Typography variant="body2">{selectedText}</Typography>
            </SelectionContainer>
        </Box>
    );
};

SelectionPreview.propTypes = {
    selectedText: PropTypes.string.isRequired,
    useSelectedTextOnly: PropTypes.bool.isRequired,
    onToggleUseSelectedTextOnly: PropTypes.func.isRequired,
};

export default SelectionPreview;
