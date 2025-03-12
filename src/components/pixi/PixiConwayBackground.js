import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import * as PIXI from 'pixi.js';
import { ConwayGridManager } from './ConwayGridManager';
import ConwayControls from './ConwayControls';
import { testPixiJS } from './test';

// Constants
const CELL_SIZE = 15;
const INITIAL_LIFE_PROBABILITY = 0.08;

const PixiConwayBackground = () => {
    const containerRef = useRef(null);
    const appRef = useRef(null);
    const gridManagerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [showControls, setShowControls] = useState(false);
    const [error, setError] = useState(null);

    // Initialize the PIXI application
    useEffect(() => {
        const setupPixi = async () => {
            try {
                // Test PixiJS first
                const testResult = await testPixiJS();
                console.log('PixiJS test result:', testResult);

                if (!testResult) {
                    throw new Error('PixiJS test failed');
                }

                // Get the full scrollable height of the document
                const fullHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                );

                // Create PIXI Application - using the new v8 API
                const app = new PIXI.Application();

                // Initialize the application with options
                await app.init({
                    width: window.innerWidth,
                    height: fullHeight,
                    background: 0x000000,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1,
                    autoDensity: true,
                });

                // Add the canvas to the DOM
                if (containerRef.current) {
                    containerRef.current.appendChild(app.canvas);
                }

                // Create grid manager
                const gridManager = new ConwayGridManager({
                    app,
                    cellSize: CELL_SIZE,
                    initialLifeProbability: INITIAL_LIFE_PROBABILITY,
                });

                // Store references
                appRef.current = app;
                gridManagerRef.current = gridManager;

                // Handle resize
                const handleResize = () => {
                    const fullHeight = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    );
                    app.renderer.resize(window.innerWidth, fullHeight);
                    gridManager.resize(window.innerWidth, fullHeight);
                };

                window.addEventListener('resize', handleResize);

                // Handle click events for cell toggling
                const handleClick = (event) => {
                    const rect = app.canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    gridManager.toggleCellAtPosition(x, y);
                };

                app.canvas.addEventListener('click', handleClick);

                // Start the animation
                gridManager.start();

                // Store the event handlers for cleanup
                app.handleResize = handleResize;
                app.handleClick = handleClick;
            } catch (err) {
                console.error('Error setting up PixiJS:', err);
                setError(err.message);
            }
        };

        setupPixi();

        // Cleanup
        return () => {
            if (appRef.current) {
                window.removeEventListener(
                    'resize',
                    appRef.current.handleResize
                );

                if (appRef.current.canvas) {
                    appRef.current.canvas.removeEventListener(
                        'click',
                        appRef.current.handleClick
                    );
                }

                appRef.current.destroy(true, true);
            }
        };
    }, []);

    // Handle play/pause
    useEffect(() => {
        if (!gridManagerRef.current) return;

        if (isPlaying) {
            gridManagerRef.current.start();
        } else {
            gridManagerRef.current.stop();
        }
    }, [isPlaying]);

    // Handle speed change
    useEffect(() => {
        if (!gridManagerRef.current) return;
        gridManagerRef.current.setSpeed(speed);
    }, [speed]);

    // Toggle controls visibility
    const toggleControls = () => {
        setShowControls(!showControls);
    };

    // Create preset patterns
    const createPreset = (presetName) => {
        if (!gridManagerRef.current) return;
        gridManagerRef.current.createPreset(presetName);
    };

    // Clear the grid
    const clearGrid = () => {
        if (!gridManagerRef.current) return;
        gridManagerRef.current.clearGrid();
    };

    // Randomize the grid
    const randomizeGrid = () => {
        if (!gridManagerRef.current) return;
        gridManagerRef.current.randomizeGrid();
    };

    // If there's an error, display it
    if (error) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100%',
                    zIndex: -1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '20px',
                }}
            >
                <div>
                    <h2>Error initializing PixiJS</h2>
                    <p>{error}</p>
                    <p>Please check the console for more details.</p>
                </div>
            </Box>
        );
    }

    return (
        <>
            <Box
                ref={containerRef}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100%',
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 10,
                }}
            >
                <Box
                    onClick={toggleControls}
                    sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '24px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                    }}
                >
                    {showControls ? '×' : '⚙'}
                </Box>
            </Box>
            {showControls && (
                <ConwayControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    speed={speed}
                    setSpeed={setSpeed}
                    createPreset={createPreset}
                    clearGrid={clearGrid}
                    randomizeGrid={randomizeGrid}
                />
            )}
        </>
    );
};

export default PixiConwayBackground;
