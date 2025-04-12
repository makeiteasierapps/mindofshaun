import { useEffect } from 'react';

/**
 * Custom hook for handling Conway grid interactions
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether interaction is enabled
 * @param {Object} options.app - PixiJS application instance
 * @param {Object} options.gridManager - Conway grid manager instance
 * @returns {void}
 */
const useConwayInteraction = ({ enabled, app, gridManager }) => {
    useEffect(() => {
        if (!enabled || !gridManager || !app) return;

        // This function handles all clicks on the document
        const handleGlobalClick = (event) => {
            // Skip if clicking on controls
            if (event.target.closest('.controls-panel')) return;

            // Check if the click is on an interactive element
            if (
                event.target.tagName === 'BUTTON' ||
                event.target.tagName === 'A' ||
                event.target.tagName === 'INPUT' ||
                event.target.tagName === 'SELECT' ||
                event.target.tagName === 'TEXTAREA' ||
                event.target.closest('[data-interactive]') ||
                window.getComputedStyle(event.target).cursor === 'pointer' ||
                event.target.onclick ||
                event.target.getAttribute('role') === 'button'
            ) {
                // This is an interactive element, let the normal click proceed
                return;
            }

            // This is a click on a non-interactive element, use it for Conway
            const rect = app.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Toggle the cell at the calculated position
            gridManager.toggleCellAtPosition(x, y);
        };

        // Add the global click handler
        document.addEventListener('click', handleGlobalClick);

        // Cleanup
        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, [enabled, app, gridManager]);
};

export default useConwayInteraction;
