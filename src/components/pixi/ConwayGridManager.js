import * as PIXI from 'pixi.js';
import { PRESETS } from './presets';
import { screenToGrid } from './utils';

// Colors for cells
const COLORS = [
    0x2fffd1, // Neon Cyan
    0xff5733, // Bright Red
    0x89cff0, // Sky Blue
];

export class ConwayGridManager {
    constructor({
        app,
        cellSize,
        initialLifeProbability,
        viewportWidth,
        viewportHeight,
    }) {
        this.app = app;
        this.cellSize = cellSize;
        this.initialLifeProbability = initialLifeProbability;
        this.isRunning = false;
        this.tickerSpeed = 1;
        this.tickCount = 0;
        this.updateInterval = 10; // Update every 10 ticks at speed 1
        this.viewportWidth = viewportWidth || window.innerWidth;
        this.viewportHeight = viewportHeight || window.innerHeight;

        // Create containers
        this.gridContainer = new PIXI.Container();
        this.app.stage.addChild(this.gridContainer);

        // Initialize grid
        this.initGrid();

        // Setup ticker
        this.ticker = PIXI.Ticker.shared;
        this.ticker.add(this.update.bind(this));
    }

    // Initialize the grid
    initGrid() {
        // Use the viewport dimensions for the grid
        const width = this.viewportWidth;
        const height = this.viewportHeight;

        this.columns = Math.ceil(width / this.cellSize);
        this.rows = Math.ceil(height / this.cellSize);

        // Create grid data
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.rows }, () => ({
                alive: Math.random() < this.initialLifeProbability,
                opacity: 0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }))
        );

        // Create next grid for double buffering
        this.nextGrid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.rows }, () => ({
                alive: false,
                opacity: 0,
                color: 0xffffff,
            }))
        );

        // Create graphics for cells
        this.cellGraphics = new PIXI.Graphics();
        this.gridContainer.addChild(this.cellGraphics);

        // Draw initial state
        this.drawGrid();
    }

    // Draw the grid
    drawGrid() {
        this.cellGraphics.clear();

        // Apply a slight fade effect to the entire screen
        this.cellGraphics
            .rect(0, 0, this.app.screen.width, this.app.screen.height)
            .fill({ color: 0x000000, alpha: 0.1 });

        // Draw each cell
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                const { alive, opacity, color } = this.grid[i][j];

                if (alive || opacity > 0) {
                    const x = i * this.cellSize;
                    const y = j * this.cellSize;
                    const centerX = x + this.cellSize / 2;
                    const centerY = y + this.cellSize / 2;
                    const radius = this.cellSize / 2;

                    // Create a radial gradient effect
                    const alpha = opacity;
                    this.cellGraphics
                        .circle(centerX, centerY, radius)
                        .fill({ color, alpha });
                }
            }
        }
    }

    // Get the number of live neighbors for a cell
    getNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const col = (x + i + this.columns) % this.columns;
                const row = (y + j + this.rows) % this.rows;
                if (this.grid[col][row].alive) count++;
            }
        }
        return count;
    }

    // Update the grid based on Conway's rules
    updateGrid() {
        // Apply Conway's rules to calculate the next state
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.grid[i][j];
                const neighbors = this.getNeighbors(i, j);
                const nextCell = this.nextGrid[i][j];

                // Apply Conway's rules
                nextCell.alive = cell.alive
                    ? neighbors === 2 || neighbors === 3
                    : neighbors === 3;

                // Update opacity
                nextCell.opacity = nextCell.alive
                    ? Math.min(cell.opacity + 0.05, 0.3)
                    : Math.max(cell.opacity - 0.05, 0);

                // Keep the color
                nextCell.color = cell.color;
            }
        }

        // Swap grids
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
    }

    // Update function called by the ticker
    update(time) {
        if (!this.isRunning) return;

        this.tickCount++;

        // Only update at the specified interval based on speed
        if (this.tickCount >= this.updateInterval / this.tickerSpeed) {
            this.updateGrid();
            this.drawGrid();
            this.tickCount = 0;
        }
    }

    // Start the simulation
    start() {
        this.isRunning = true;
    }

    // Stop the simulation
    stop() {
        this.isRunning = false;
    }

    // Set the simulation speed
    setSpeed(speed) {
        this.tickerSpeed = speed;
    }

    // Resize the grid
    resize(width, height) {
        // Update viewport dimensions
        this.viewportWidth = width;
        this.viewportHeight = height;

        // Save current grid state
        const oldGrid = this.grid;
        const oldColumns = this.columns;
        const oldRows = this.rows;

        // Calculate new dimensions
        this.columns = Math.ceil(width / this.cellSize);
        this.rows = Math.ceil(height / this.cellSize);

        // Create new grids
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.rows }, () => ({
                alive: false,
                opacity: 0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }))
        );

        this.nextGrid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.rows }, () => ({
                alive: false,
                opacity: 0,
                color: 0xffffff,
            }))
        );

        // Copy old grid data to new grid where possible
        for (let i = 0; i < Math.min(oldColumns, this.columns); i++) {
            for (let j = 0; j < Math.min(oldRows, this.rows); j++) {
                this.grid[i][j] = { ...oldGrid[i][j] };
            }
        }

        // Redraw the grid
        this.drawGrid();
    }

    // Toggle a cell at the given position
    toggleCellAtPosition(x, y) {
        // Log the input coordinates
        console.log('toggleCellAtPosition input:', {
            x,
            y,
            scrollY: window.scrollY,
        });

        // Convert screen coordinates to grid coordinates using the utility function
        // The click handler already gives us coordinates relative to the canvas
        const { col, row } = screenToGrid(x, y, this.cellSize);

        console.log('Grid coordinates:', {
            col,
            row,
            columns: this.columns,
            rows: this.rows,
            cellSize: this.cellSize,
        });

        // Check if the coordinates are valid
        if (col >= 0 && col < this.columns && row >= 0 && row < this.rows) {
            // Toggle the cell
            const cell = this.grid[col][row];
            cell.alive = !cell.alive;
            cell.opacity = cell.alive ? 1 : 0;

            // Log the cell state
            console.log('Cell toggled:', { col, row, alive: cell.alive });

            // Redraw the grid
            this.drawGrid();
        } else {
            console.log('Cell coordinates out of bounds');
        }
    }

    // Create a preset pattern at the center of the grid
    createPreset(presetName) {
        // Calculate center position based on grid dimensions
        const centerCol = Math.floor(this.columns / 2);
        const centerRow = Math.floor(this.rows / 2);

        this.createPresetAtGridPosition(presetName, centerCol, centerRow);
    }

    // Create a preset pattern at a specific screen position
    createPresetAtPosition(presetName, x, y) {
        console.log('Creating preset at position:', {
            presetName,
            x,
            y,
            scrollY: window.scrollY,
        });

        // Convert screen coordinates to grid coordinates using the utility function
        // The click handler already gives us coordinates relative to the canvas
        const { col, row } = screenToGrid(x, y, this.cellSize);

        console.log('Grid coordinates for preset:', {
            col,
            row,
            cellSize: this.cellSize,
        });

        this.createPresetAtGridPosition(presetName, col, row);
    }

    // Create a preset pattern at a specific grid position
    createPresetAtGridPosition(presetName, centerCol, centerRow) {
        if (!PRESETS[presetName]) return;

        const pattern = PRESETS[presetName];
        const patternHeight = pattern.length;
        const patternWidth = pattern[0].length;

        // Calculate top-left position
        const startCol = centerCol - Math.floor(patternWidth / 2);
        const startRow = centerRow - Math.floor(patternHeight / 2);

        // Clear a region around the pattern
        const clearRadius = Math.max(patternWidth, patternHeight) + 5;
        for (let i = -clearRadius; i <= clearRadius; i++) {
            for (let j = -clearRadius; j <= clearRadius; j++) {
                const col = centerCol + i;
                const row = centerRow + j;

                if (
                    col >= 0 &&
                    col < this.columns &&
                    row >= 0 &&
                    row < this.rows
                ) {
                    this.grid[col][row].alive = false;
                    this.grid[col][row].opacity = 0;
                }
            }
        }

        // Place the pattern
        for (let i = 0; i < patternHeight; i++) {
            for (let j = 0; j < patternWidth; j++) {
                const col = startCol + j;
                const row = startRow + i;

                if (
                    col >= 0 &&
                    col < this.columns &&
                    row >= 0 &&
                    row < this.rows
                ) {
                    const isAlive = pattern[i][j] === 1;
                    this.grid[col][row].alive = isAlive;
                    this.grid[col][row].opacity = isAlive ? 1 : 0;
                }
            }
        }

        this.drawGrid();
    }

    // Clear the grid
    clearGrid() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j].alive = false;
                this.grid[i][j].opacity = 0;
            }
        }
        this.drawGrid();
    }

    // Randomize the grid
    randomizeGrid() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                const isAlive = Math.random() < this.initialLifeProbability;
                this.grid[i][j].alive = isAlive;
                this.grid[i][j].opacity = isAlive ? 1 : 0;
            }
        }
        this.drawGrid();
    }
}
