import uvicorn
import argparse
import logging
from server import create_app

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = create_app()

def main(debug=False):
    logger.info(f"Starting server in {'debug' if debug else 'production'} mode")
    if debug:
        logger.info("Running with reload=True")
        uvicorn.run("run:app", host="0.0.0.0", port=6066, reload=True, log_level="debug")
    else:
        logger.info("Running with workers=1")
        uvicorn.run("run:app", host="0.0.0.0", port=6066, workers=1, log_level="info")
    logger.info("Server started")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run the application in production or development mode.')
    parser.add_argument('--dev', action='store_true', help='Run in development mode with debugging and hot reloading')
    args = parser.parse_args()

    logger.info(f"Starting application with dev={args.dev}")
    main(debug=args.dev)
