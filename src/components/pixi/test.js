import * as PIXI from 'pixi.js';

// This is a simple test function to verify that PixiJS v8 is working correctly
export async function testPixiJS() {
    console.log('Testing PixiJS implementation...');

    try {
        // Create a new PIXI Application
        const app = new PIXI.Application();

        // Initialize the application
        await app.init({
            width: 800,
            height: 600,
            background: 0x1099bb,
        });

        console.log('PixiJS Application created successfully!');
        console.log('Canvas element:', app.canvas);

        // Create a container
        const container = new PIXI.Container();
        app.stage.addChild(container);

        // Create a graphics object
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawCircle(100, 100, 50);
        graphics.endFill();
        container.addChild(graphics);

        console.log('Graphics created successfully!');

        // Clean up
        app.destroy(true, true);

        return true;
    } catch (error) {
        console.error('Error testing PixiJS:', error);
        return false;
    }
}
