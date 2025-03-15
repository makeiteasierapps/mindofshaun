/**
 * Utility functions for Conway's Game of Life
 */

/**
 * Get the full document height
 * @returns {number} The full document height
 */
export const getDocumentHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
    );
};

/**
 * Get the viewport dimensions
 * @returns {Object} The viewport width and height
 */
export const getViewportDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

/**
 * Convert screen coordinates to grid coordinates
 * @param {number} x - The x coordinate
 * @param {number} y - The y coordinate
 * @param {number} cellSize - The size of each cell
 * @returns {Object} The grid column and row
 */
export const screenToGrid = (x, y, cellSize) => {
    // Ensure we're working with positive numbers
    const safeX = Math.max(0, x);
    const safeY = Math.max(0, y);

    // Convert to grid coordinates
    const col = Math.floor(safeX / cellSize);
    const row = Math.floor(safeY / cellSize);

    console.log('screenToGrid:', { x, y, cellSize, col, row });

    return { col, row };
};

/**
 * Convert grid coordinates to screen coordinates
 * @param {number} col - The grid column
 * @param {number} row - The grid row
 * @param {number} cellSize - The size of each cell
 * @returns {Object} The screen x and y coordinates
 */
export const gridToScreen = (col, row, cellSize) => {
    const x = col * cellSize;
    const y = row * cellSize;
    return { x, y };
};

/**
 * Get the center of the current viewport
 * @returns {Object} The center x and y coordinates
 */
export const getViewportCenter = () => {
    // Get the viewport dimensions
    const { width, height } = getViewportDimensions();

    // Calculate the center coordinates
    // For the y-coordinate, we don't need to add window.scrollY because
    // we want the center of the current viewport, not the absolute position
    return {
        x: width / 2,
        y: height / 2,
    };
};

/**
 * Scroll to a specific position
 * @param {number} x - The x coordinate
 * @param {number} y - The y coordinate
 * @param {boolean} smooth - Whether to use smooth scrolling
 */
export const scrollToPosition = (x, y, smooth = true) => {
    window.scrollTo({
        left: x,
        top: y,
        behavior: smooth ? 'smooth' : 'auto',
    });
};

/**
 * Scroll to the center of the viewport
 * @param {number} y - The y coordinate to center on
 * @param {boolean} smooth - Whether to use smooth scrolling
 */
export const scrollToCenter = (y, smooth = true) => {
    scrollToPosition(0, Math.max(0, y - window.innerHeight / 2), smooth);
};
