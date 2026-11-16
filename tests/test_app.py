import unittest

from server import create_app


class AppTests(unittest.TestCase):
    def test_health_route_is_registered(self):
        app = create_app()
        paths = {getattr(route, "path", None) for route in app.routes}
        self.assertIn("/api/health", paths)


if __name__ == "__main__":
    unittest.main()
