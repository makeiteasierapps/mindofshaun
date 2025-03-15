import { useState, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { getViewportDimensions } from '../utils';
import { ConwayGridManager } from '../ConwayGridManager';

/**
 * Custom hook for setting up PixiJS and Conway's Game of Life
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.containerRef - Reference to the container element
 * @param {number} options.cellSize - Size of each cell in pixels
 * @param {number} options.initialLifeProbability - Probability of a cell being alive initially
 * @returns {Object} - PixiJS and Conway grid manager references and state
 */
const usePixiSetup = ({ containerRef, cellSize, initialLifeProbability }) => {
    const [app, setApp] = useState(null);
    const [gridManager, setGridManager] = useState(null);
    const [error, setError] = useState(null);
    const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
    const [interactionEnabled, setInteractionEnabled] = useState(false);

    useEffect(() => {
        const setupPixi = async () => {
            try {
                // Get the viewport dimensions
                const { width: viewportWidth, height: viewportHeight } =
                    getViewportDimensions();

                // Update viewport size state
                setViewportSize({
                    width: viewportWidth,
                    height: viewportHeight,
                });

                // Create PIXI Application - using the new v8 API
                const app = new PIXI.Application();

                // Initialize the application with options
                await app.init({
                    width: viewportWidth,
                    height: viewportHeight,
                    background: 0x000000,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1,
                    autoDensity: true,
                });

                // Add the canvas to the DOM
                if (containerRef.current) {
                    containerRef.current.appendChild(app.canvas);

                    // Make sure the canvas covers the entire container
                    app.canvas.style.width = '100%';
                    app.canvas.style.height = '100%';
                    app.canvas.style.position = 'absolute';
                    app.canvas.style.top = '0';
                    app.canvas.style.left = '0';
                    app.canvas.style.zIndex = '-1'; // Set to -1 so it's behind everything
                    app.canvas.style.pointerEvents = 'none'; // Don't capture clicks
                }

                // Create grid manager
                const gridManager = new ConwayGridManager({
                    app,
                    cellSize,
                    initialLifeProbability,
                    viewportWidth,
                    viewportHeight,
                });

                // Store references
                setApp(app);
                setGridManager(gridManager);

                // Handle resize
                const handleResize = () => {
                    const {
                        width: newViewportWidth,
                        height: newViewportHeight,
                    } = getViewportDimensions();

                    // Update viewport size state
                    setViewportSize({
                        width: newViewportWidth,
                        height: newViewportHeight,
                    });

                    app.renderer.resize(newViewportWidth, newViewportHeight);
                    gridManager.resize(newViewportWidth, newViewportHeight);
                };

                window.addEventListener('resize', handleResize);

                // Start the animation
                gridManager.start();

                // Enable interaction after setup
                setInteractionEnabled(true);

                // Store the event handlers for cleanup
                app.handleResize = handleResize;
            } catch (err) {
                console.error('Error setting up PixiJS:', err);
                setError(err.message);
            }
        };

        setupPixi();

        // Cleanup
        return () => {
            if (app) {
                window.removeEventListener('resize', app.handleResize);
                app.destroy(true, true);
            }
        };
    }, [containerRef, cellSize, initialLifeProbability]);

    return {
        app,
        gridManager,
        error,
        viewportSize,
        interactionEnabled,
    };
};

export default usePixiSetup;
