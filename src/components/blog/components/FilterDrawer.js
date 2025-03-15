import React from 'react';
import {
    Box,
    Typography,
    Chip,
    Button,
    Drawer,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const FilterDrawer = ({
    open,
    onClose,
    searchTerm,
    setSearchTerm,
    selectedTags,
    handleTagSelect,
    allTags,
    clearFilters,
}) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 300, p: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Filter Posts</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Filter by Tags
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 3,
                    }}
                >
                    {allTags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            clickable
                            color={
                                selectedTags.includes(tag)
                                    ? 'primary'
                                    : 'default'
                            }
                            onClick={() => handleTagSelect(tag)}
                        />
                    ))}
                </Box>

                {(selectedTags.length > 0 || searchTerm) && (
                    <Button variant="outlined" onClick={clearFilters} fullWidth>
                        Clear Filters
                    </Button>
                )}
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;
