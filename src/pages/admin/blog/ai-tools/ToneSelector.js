import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const ToneSelector = ({
    tone,
    setTone,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}
        >
            <FormControl size="small" sx={{ width: '150px' }}>
                <InputLabel sx={{ color: theme.palette.primary.light }}>
                    Tone
                </InputLabel>
                <Select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    label="Tone"
                    sx={{
                        color: theme.palette.text.primary,
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                        '.MuiSvgIcon-root': {
                            color: theme.palette.primary.light,
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: theme.palette.background.paper,
                            },
                        },
                    }}
                >
                    <MenuItem
                        value="professional"
                        sx={{
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.2)',
                            },
                        }}
                    >
                        Professional
                    </MenuItem>
                    <MenuItem
                        value="casual"
                        sx={{
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.2)',
                            },
                        }}
                    >
                        Casual
                    </MenuItem>
                    <MenuItem
                        value="formal"
                        sx={{
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.2)',
                            },
                        }}
                    >
                        Formal
                    </MenuItem>
                    <MenuItem
                        value="friendly"
                        sx={{
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.2)',
                            },
                        }}
                    >
                        Friendly
                    </MenuItem>
                    <MenuItem
                        value="humorous"
                        sx={{
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.2)',
                            },
                        }}
                    >
                        Humorous
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

ToneSelector.propTypes = {
    tone: PropTypes.string.isRequired,
    setTone: PropTypes.func.isRequired,
};

export default ToneSelector;
