import React, { useState } from 'react';
import {
    Box,
    Typography,
    Slider,
    Button,
    IconButton,
    Tabs,
    Tab,
    Tooltip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const ConwayControls = ({
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    createPreset,
    clearGrid,
    randomizeGrid,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    // Group presets by category
    const presetCategories = {
        basic: [
            {
                name: 'Glider',
                value: 'glider',
                description: 'A simple glider that moves diagonally',
            },
            {
                name: 'Blinker',
                value: 'blinker',
                description: 'A simple oscillator with period 2',
            },
            {
                name: 'R-Pentomino',
                value: 'rPentomino',
                description: 'A methuselah that evolves for many generations',
            },
        ],
        oscillators: [
            {
                name: 'Pulsar',
                value: 'pulsar',
                description: 'A period 3 oscillator',
            },
            {
                name: 'Pentadecathlon',
                value: 'pentadecathlon',
                description: 'A period 15 oscillator',
            },
        ],
        spaceships: [
            {
                name: 'LWSS',
                value: 'lwss',
                description: 'Lightweight Spaceship that moves horizontally',
            },
            {
                name: 'Gosper Glider Gun',
                value: 'gosperGliderGun',
                description: 'Creates an infinite stream of gliders',
            },
        ],
        methuselahs: [
            {
                name: 'Acorn',
                value: 'acorn',
                description: 'Evolves for 5206 generations',
            },
            {
                name: 'Diehard',
                value: 'diehard',
                description: 'Dies after 130 generations',
            },
        ],
    };

    // Get the presets for the active tab
    const getActivePresets = () => {
        const categories = Object.keys(presetCategories);
        if (activeTab >= 0 && activeTab < categories.length) {
            return presetCategories[categories[activeTab]];
        }
        return [];
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Prevent clicks from propagating to the overlay
    const handleControlsClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Box
            onClick={handleControlsClick}
            sx={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                padding: '15px',
                color: 'white',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                }}
            >
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Conway's Game of Life
                </Typography>
                <Tooltip title="About Conway's Game of Life">
                    <IconButton
                        size="small"
                        sx={{ color: 'white' }}
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        <InfoIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            {showInfo && (
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        fontSize: '0.85rem',
                    }}
                >
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                        Conway's Game of Life is a cellular automaton where
                        cells live or die based on simple rules:
                    </Typography>
                    <ul style={{ margin: '0 0 8px 20px', padding: 0 }}>
                        <li>Any live cell with 2-3 live neighbors survives</li>
                        <li>
                            Any dead cell with exactly 3 live neighbors becomes
                            alive
                        </li>
                        <li>All other cells die or stay dead</li>
                    </ul>
                    <Typography variant="body2">
                        Click on the grid to toggle cells. Use presets to create
                        patterns.
                    </Typography>
                </Box>
            )}

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
                        Speed: {speed.toFixed(1)}x
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
            <Typography variant="subtitle1" sx={{ marginBottom: '5px' }}>
                Presets:
            </Typography>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    marginBottom: '10px',
                    minHeight: '35px',
                    '& .MuiTab-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        minHeight: '35px',
                        padding: '5px 10px',
                        fontSize: '0.8rem',
                        textTransform: 'none',
                    },
                    '& .Mui-selected': {
                        color: '#2fffd1',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#2fffd1',
                    },
                }}
            >
                <Tab label="Basic" />
                <Tab label="Oscillators" />
                <Tab label="Spaceships" />
                <Tab label="Methuselahs" />
            </Tabs>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {getActivePresets().map((preset) => (
                    <Tooltip
                        key={preset.value}
                        title={preset.description}
                        placement="top"
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => createPreset(preset.value)}
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                                padding: '3px 8px',
                                minWidth: 'auto',
                                fontSize: '0.8rem',
                                '&:hover': {
                                    borderColor: '#89cff0',
                                    color: '#89cff0',
                                },
                            }}
                        >
                            {preset.name}
                        </Button>
                    </Tooltip>
                ))}
            </Box>

            {/* Instructions */}
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    marginTop: '15px',
                    opacity: 0.7,
                    textAlign: 'center',
                }}
            >
                Click on the grid to toggle cells
            </Typography>
        </Box>
    );
};

export default ConwayControls;
