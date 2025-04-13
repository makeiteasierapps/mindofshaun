import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Paper,
    IconButton,
    Slide,
    Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchToolbar = ({ searchTerm, setSearchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const toggleSearchBar = () => {
        setIsOpen(!isOpen);
        // If we're closing and there's text, clear it
        if (isOpen && searchTerm) {
            setSearchTerm('');
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                height: '40px', // Fixed height to prevent layout shift
            }}
        >
            <Tooltip title={isOpen ? 'Hide search' : 'Show search'}>
                <IconButton
                    onClick={toggleSearchBar}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        zIndex: 2,
                    }}
                    size="small"
                >
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <Slide
                direction="right"
                in={isOpen}
                mountOnEnter
                unmountOnExit
                timeout={300}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 1.5,
                        width: 'calc(100% - 40px)',
                        position: 'absolute',
                        left: '40px',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="standard"
                        InputProps={{
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={handleClearSearch}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                            sx: { px: 1 },
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                            },
                        }}
                        autoFocus
                    />
                </Paper>
            </Slide>
        </Box>
    );
};

export default SearchToolbar;
