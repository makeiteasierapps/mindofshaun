import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

// Constants
const CELL_SIZE = 15;
const OPACITY_STEP = 0.05;
const INITIAL_LIFE_PROBABILITY = 0.08;

// Colors
const COLORS = [
    'rgba(47, 255, 209, OPACITY)', // Neon Cyan
    'rgba(255, 87, 51, OPACITY)', // Bright Red
    'rgba(137, 207, 240, OPACITY)', // Sky Blue
];

const ConwayBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const runningRef = useRef(true);
    const gridRef = useRef([]);
    const columnsRef = useRef(0);
    const rowsRef = useRef(0);

    // 🎨 Initialize the grid with aging properties
    const initGrid = () => {
        const fullHeight = document.documentElement.scrollHeight;
        columnsRef.current = Math.floor(window.innerWidth / CELL_SIZE);
        rowsRef.current = Math.floor(fullHeight / CELL_SIZE);

        gridRef.current = Array.from({ length: columnsRef.current }, () =>
            Array.from({ length: rowsRef.current }, () => ({
                alive: Math.random() < INITIAL_LIFE_PROBABILITY,
                opacity: 0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }))
        );
    };

    // 👀 Get neighbors count
    const getNeighbors = (x, y) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const col = (x + i + columnsRef.current) % columnsRef.current;
                const row = (y + j + rowsRef.current) % rowsRef.current;
                if (gridRef.current[col][row].alive) count++;
            }
        }
        return count;
    };

    // 🔄 Update grid using Conway's rules with color persistence
    const updateGrid = () => {
        const newGrid = gridRef.current.map((col, i) =>
            col.map((cell, j) => {
                const neighbors = getNeighbors(i, j);
                const newAlive = cell.alive
                    ? neighbors === 2 || neighbors === 3
                    : neighbors === 3;
                return {
                    ...cell,
                    alive: newAlive,
                    opacity: newAlive
                        ? Math.min(cell.opacity + OPACITY_STEP, 1)
                        : Math.max(cell.opacity - OPACITY_STEP, 0),
                };
            })
        );
        gridRef.current = newGrid;
    };

    // 🎨 Draw cells onto the canvas
    const drawGrid = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear screen with slight fading effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < columnsRef.current; i++) {
            for (let j = 0; j < rowsRef.current; j++) {
                const { alive, opacity, color } = gridRef.current[i][j];
                if (alive || opacity > 0) {
                    const centerX = i * CELL_SIZE + CELL_SIZE / 2;
                    const centerY = j * CELL_SIZE + CELL_SIZE / 2;
                    const gradient = ctx.createRadialGradient(
                        centerX,
                        centerY,
                        0,
                        centerX,
                        centerY,
                        CELL_SIZE
                    );
                    gradient.addColorStop(
                        0,
                        color.replace('OPACITY', opacity.toFixed(2))
                    );
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, CELL_SIZE / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    };

    // 🎬 Animation loop
    const animate = () => {
        if (runningRef.current) {
            updateGrid();
            drawGrid();
            animationRef.current = requestAnimationFrame(animate);
        }
    };

    // 📏 Handle window resizes
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Get the full scrollable height of the document
            const fullHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            );
            canvas.width = window.innerWidth;
            canvas.height = fullHeight;
            initGrid();
            drawGrid();
        }
    };

    // 🏗️ Lifecycle Management
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initial setup with full document height
        const fullHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );

        canvas.width = window.innerWidth;
        canvas.height = fullHeight;

        initGrid();
        drawGrid();

        animationRef.current = requestAnimationFrame(animate);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <Box
            component="canvas"
            ref={canvasRef}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
};

export default ConwayBackground;
