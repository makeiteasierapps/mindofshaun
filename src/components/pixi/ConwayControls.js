import React from 'react';
import { Box, Typography, Slider, Button, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';

const ConwayControls = ({
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    createPreset,
    clearGrid,
    randomizeGrid,
}) => {
    // Presets available
    const presets = [
        { name: 'Glider', value: 'glider' },
        { name: 'Blinker', value: 'blinker' },
        { name: 'Pulsar', value: 'pulsar' },
        { name: 'Gosper Glider Gun', value: 'gosperGliderGun' },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: '300px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                padding: '15px',
                color: 'white',
                zIndex: 10,
                backdropFilter: 'blur(5px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Typography
                variant="h6"
                sx={{ marginBottom: '15px', textAlign: 'center' }}
            >
                Conway's Game of Life
            </Typography>

            {/* Play/Pause and Speed Controls */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                }}
            >
                <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{ color: 'white', marginRight: '10px' }}
                >
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Box sx={{ width: '100%' }}>
                    <Typography id="speed-slider" gutterBottom>
                        Speed: {speed}x
                    </Typography>
                    <Slider
                        value={speed}
                        onChange={(_, newValue) => setSpeed(newValue)}
                        aria-labelledby="speed-slider"
                        step={0.1}
                        min={0.1}
                        max={3}
                        sx={{
                            color: '#2fffd1',
                            '& .MuiSlider-thumb': {
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow:
                                        '0px 0px 0px 8px rgba(47, 255, 209, 0.16)',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Grid Controls */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={randomizeGrid}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: '#2fffd1',
                            color: '#2fffd1',
                        },
                    }}
                >
                    Randomize
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={clearGrid}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: '#ff5733',
                            color: '#ff5733',
                        },
                    }}
                >
                    Clear
                </Button>
            </Box>

            {/* Presets */}
            <Typography variant="subtitle1" sx={{ marginBottom: '10px' }}>
                Presets:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {presets.map((preset) => (
                    <Button
                        key={preset.value}
                        variant="outlined"
                        size="small"
                        onClick={() => createPreset(preset.value)}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                                borderColor: '#89cff0',
                                color: '#89cff0',
                            },
                        }}
                    >
                        {preset.name}
                    </Button>
                ))}
            </Box>

            {/* Instructions */}
            <Typography
                variant="caption"
                sx={{ display: 'block', marginTop: '15px', opacity: 0.7 }}
            >
                Click on the grid to toggle cells. Use presets to create
                patterns.
            </Typography>
        </Box>
    );
};

export default ConwayControls;
