from server.routes.blog import router as blog_router
from server.routes.projects import router as projects_router

# List of all routers to be exported
__all__ = ["blog_router", "projects_router"] 