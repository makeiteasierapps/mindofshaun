from fastapi import FastAPI


def create_app():
    app = FastAPI()

    @app.get("/api/health")
    def health():
        return {"ok": True}

    return app
