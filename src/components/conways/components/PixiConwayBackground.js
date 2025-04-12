import React, { useRef } from 'react';
import { Box } from '@mui/material';
import ConwayControls from './ConwayControls';
import usePixiSetup from '../hooks/usePixiSetup';
import useConwayInteraction from '../hooks/useConwayInteraction';
import useConwayControls from '../hooks/useConwayControls';
import {
    ErrorDisplay,
    ControlsToggleButton,
    CanvasContainer,
} from './ConwayUIComponents';

// Constants
const CELL_SIZE = 15;
const INITIAL_LIFE_PROBABILITY = 0.08;

/**
 * Conway's Game of Life background component
 * @returns {JSX.Element} - Conway's Game of Life background component
 */
const PixiConwayBackground = () => {
    const containerRef = useRef(null);

    // Set up PixiJS and Conway grid
    const { app, gridManager, error, interactionEnabled } = usePixiSetup({
        containerRef,
        cellSize: CELL_SIZE,
        initialLifeProbability: INITIAL_LIFE_PROBABILITY,
    });

    // Set up interaction
    useConwayInteraction({
        enabled: interactionEnabled,
        app,
        gridManager,
    });

    // Set up controls
    const {
        isPlaying,
        setIsPlaying,
        speed,
        setSpeed,
        showControls,
        toggleControls,
        createPreset,
        clearGrid,
        randomizeGrid,
    } = useConwayControls(gridManager, app);

    // If there's an error, display it
    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <>
            {/* Canvas container */}
            <CanvasContainer containerRef={containerRef} />

            {/* Controls toggle button */}
            <ControlsToggleButton
                showControls={showControls}
                toggleControls={toggleControls}
            />

            {/* Controls panel */}
            {showControls && (
                <Box className="controls-panel" sx={{ zIndex: 10000 }}>
                    <ConwayControls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        speed={speed}
                        setSpeed={setSpeed}
                        createPreset={createPreset}
                        clearGrid={clearGrid}
                        randomizeGrid={randomizeGrid}
                    />
                </Box>
            )}
        </>
    );
};

export default PixiConwayBackground;
