import { useEffect, useRef } from 'react';

const STEP = 18;
const CELL = 14;
const TICK_MS = 800;
const SEED = 0xa71c;

const PATTERNS = [
    [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ],
];

function mulberry32(seed) {
    let a = seed;
    return function next() {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function buildGrid(cols, rows) {
    const grid = new Uint8Array(cols * rows);
    const rand = mulberry32(SEED);
    const count = Math.max(6, Math.floor((cols * rows) / 420));
    for (let n = 0; n < count; n += 1) {
        const pattern = PATTERNS[Math.floor(rand() * PATTERNS.length)];
        const ox = 1 + Math.floor(rand() * Math.max(1, cols - 6));
        const oy = 1 + Math.floor(rand() * Math.max(1, rows - 6));
        pattern.forEach(([x, y]) => {
            const cx = ox + x;
            const cy = oy + y;
            if (cx >= 0 && cy >= 0 && cx < cols && cy < rows) {
                grid[cy * cols + cx] = 1;
            }
        });
    }
    return grid;
}

function step(grid, cols, rows) {
    const next = new Uint8Array(grid.length);
    for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
            let neighbors = 0;
            for (let dy = -1; dy <= 1; dy += 1) {
                for (let dx = -1; dx <= 1; dx += 1) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
                    neighbors += grid[ny * cols + nx];
                }
            }
            const alive = grid[y * cols + x] === 1;
            next[y * cols + x] = alive
                ? neighbors === 2 || neighbors === 3
                : neighbors === 3;
        }
    }
    return next;
}

export function LifeField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return undefined;

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let reduce = motion.matches;
        let cols = 0;
        let rows = 0;
        let cssW = 0;
        let cssH = 0;
        let grid = new Uint8Array(0);
        let timer = 0;
        let raf = 0;
        let running = false;
        let visible = true;
        const pointer = { x: 0, y: 0, active: false };
        const spring = { x: 0, y: 0, strength: 0, tx: 0, ty: 0, ts: 0 };

        function fit() {
            const rect = canvas.getBoundingClientRect();
            cssW = rect.width;
            cssH = rect.height;
            if (cssW < 2 || cssH < 2) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(cssW * dpr);
            canvas.height = Math.floor(cssH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.max(1, Math.floor(cssW / STEP));
            rows = Math.max(1, Math.floor(cssH / STEP));
            grid = buildGrid(cols, rows);
            draw();
        }

        function draw() {
            ctx.clearRect(0, 0, cssW, cssH);
            const influence =
                !reduce && spring.strength > 0.08 && pointer.active;
            ctx.fillStyle = 'rgba(243, 240, 232, 0.22)';
            for (let y = 0; y < rows; y += 1) {
                for (let x = 0; x < cols; x += 1) {
                    if (grid[y * cols + x] !== 1) continue;
                    if (influence) {
                        const dx = x + 0.5 - spring.x / STEP;
                        const dy = y + 0.5 - spring.y / STEP;
                        if (dx * dx + dy * dy < 16) continue;
                    }
                    ctx.fillRect(x * STEP, y * STEP, CELL, CELL);
                }
            }
            if (!influence) return;
            ctx.fillStyle = `rgba(196, 165, 116, ${0.9 * spring.strength})`;
            for (let y = 0; y < rows; y += 1) {
                for (let x = 0; x < cols; x += 1) {
                    if (grid[y * cols + x] !== 1) continue;
                    const dx = x + 0.5 - spring.x / STEP;
                    const dy = y + 0.5 - spring.y / STEP;
                    if (dx * dx + dy * dy >= 16) continue;
                    ctx.fillRect(x * STEP, y * STEP, CELL, CELL);
                }
            }
        }

        function wake() {
            if (reduce || !pointer.active || spring.strength < 0.45) return;
            const gx = spring.x / STEP;
            const gy = spring.y / STEP;
            const nearby = [];
            for (let y = 0; y < rows; y += 1) {
                for (let x = 0; x < cols; x += 1) {
                    const i = y * cols + x;
                    if (grid[i] === 1) continue;
                    const dx = x + 0.5 - gx;
                    const dy = y + 0.5 - gy;
                    const dist = dx * dx + dy * dy;
                    if (dist < 6) nearby.push({ i, dist });
                }
            }
            nearby.sort((a, b) => a.dist - b.dist);
            nearby.slice(0, 4).forEach(({ i }) => {
                grid[i] = 1;
            });
        }

        function tick() {
            if (!visible || reduce || cols === 0) return;
            grid = step(grid, cols, rows);
            wake();
            draw();
        }

        function springStep() {
            spring.x += (spring.tx - spring.x) * 0.12;
            spring.y += (spring.ty - spring.y) * 0.12;
            spring.strength += (spring.ts - spring.strength) * 0.1;
            const dx = Math.abs(spring.tx - spring.x);
            const dy = Math.abs(spring.ty - spring.y);
            const ds = Math.abs(spring.ts - spring.strength);
            return dx > 0.4 || dy > 0.4 || ds > 0.02;
        }

        function frame() {
            raf = 0;
            const moving = springStep();
            draw();
            if (moving) raf = requestAnimationFrame(frame);
        }

        function kick() {
            if (!raf) raf = requestAnimationFrame(frame);
        }

        function start() {
            if (running || reduce || !visible) return;
            running = true;
            timer = window.setInterval(tick, TICK_MS);
        }

        function stop() {
            running = false;
            window.clearInterval(timer);
            timer = 0;
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
        }

        function onMove(event) {
            if (reduce) return;
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active = true;
            spring.tx = pointer.x;
            spring.ty = pointer.y;
            spring.ts = 1;
            kick();
        }

        function onLeave() {
            pointer.active = false;
            spring.ts = 0;
            kick();
        }

        function onVisibility() {
            visible = document.visibilityState !== 'hidden' && onScreen;
            if (visible) start();
            else stop();
        }

        let onScreen = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                onScreen = entry.isIntersecting;
                onVisibility();
            },
            { threshold: 0.05 },
        );
        observer.observe(canvas);

        const onResize = () => fit();
        const resize = new ResizeObserver(onResize);
        resize.observe(canvas);

        function onMotionChange() {
            reduce = motion.matches;
            stop();
            if (!reduce) start();
            else draw();
        }

        motion.addEventListener('change', onMotionChange);
        document.addEventListener('visibilitychange', onVisibility);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerleave', onLeave);

        fit();
        start();

        return () => {
            stop();
            observer.disconnect();
            resize.disconnect();
            motion.removeEventListener('change', onMotionChange);
            document.removeEventListener('visibilitychange', onVisibility);
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
        />
    );
}
