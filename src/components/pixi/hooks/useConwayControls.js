import { useState, useEffect } from 'react';
import { getViewportCenter } from '../utils';

/**
 * Custom hook for managing Conway grid controls
 * @param {Object} gridManager - Conway grid manager instance
 * @param {Object} app - PixiJS application instance
 * @returns {Object} - Control state and functions
 */
const useConwayControls = (gridManager, app) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [showControls, setShowControls] = useState(false);

    // Handle play/pause
    useEffect(() => {
        if (!gridManager) return;

        if (isPlaying) {
            gridManager.start();
        } else {
            gridManager.stop();
        }
    }, [isPlaying, gridManager]);

    // Handle speed change
    useEffect(() => {
        if (!gridManager) return;
        gridManager.setSpeed(speed);
    }, [speed, gridManager]);

    // Toggle controls visibility
    const toggleControls = () => {
        setShowControls(!showControls);
    };

    // Create preset patterns
    const createPreset = (presetName) => {
        if (!gridManager || !app) return;

        // Get the current viewport center
        const { x: centerX, y: centerY } = getViewportCenter();

        // Get the canvas position
        const rect = app.canvas.getBoundingClientRect();

        // Calculate the position relative to the canvas
        const canvasX = centerX - rect.left;
        const canvasY = centerY - rect.top;

        // Create the preset at the calculated position
        gridManager.createPresetAtPosition(presetName, canvasX, canvasY);
    };

    // Clear the grid
    const clearGrid = () => {
        if (!gridManager) return;
        gridManager.clearGrid();
    };

    // Randomize the grid
    const randomizeGrid = () => {
        if (!gridManager) return;
        gridManager.randomizeGrid();
    };

    return {
        isPlaying,
        setIsPlaying,
        speed,
        setSpeed,
        showControls,
        toggleControls,
        createPreset,
        clearGrid,
        randomizeGrid,
    };
};

export default useConwayControls;
