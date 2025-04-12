import React from 'react';
import { Box } from '@mui/material';

/**
 * Error display component
 * @param {Object} props - Component props
 * @param {string} props.error - Error message
 * @returns {JSX.Element} - Error display component
 */
export const ErrorDisplay = ({ error }) => (
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

/**
 * Controls toggle button component
 * @param {Object} props - Component props
 * @param {boolean} props.showControls - Whether controls are visible
 * @param {Function} props.toggleControls - Function to toggle controls visibility
 * @returns {JSX.Element} - Controls toggle button component
 */
export const ControlsToggleButton = ({ showControls, toggleControls }) => (
    <Box
        sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1200,
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
);

/**
 * Canvas container component
 * @param {Object} props - Component props
 * @param {React.RefObject} props.containerRef - Reference to the container element
 * @returns {JSX.Element} - Canvas container component
 */
export const CanvasContainer = ({ containerRef }) => (
    <Box
        ref={containerRef}
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
        }}
    />
);
