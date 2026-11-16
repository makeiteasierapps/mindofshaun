import os
import unittest
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

from server.models.projects import ProjectDetails
from server.seed_projects import portfolio_projects, upsert_portfolio_projects


def mongo_client():
    load_dotenv(Path(__file__).resolve().parents[1] / "server" / ".env", override=True)
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    return MongoClient(uri, serverSelectionTimeoutMS=2000)


class PortfolioSeedTests(unittest.TestCase):
    def test_outcome_is_optional_on_project_details(self):
        details = ProjectDetails(
            title="Family AHA",
            description="Daily family connection app",
            outcome="A billed product in production",
            published=True,
        )
        self.assertEqual(details.outcome, "A billed product in production")

    def test_portfolio_projects_are_the_two_case_studies(self):
        projects = portfolio_projects()
        titles = [project["project_details"]["title"] for project in projects]
        self.assertEqual(titles, ["Family AHA", "Hosting platform"])
        for project in projects:
            details = project["project_details"]
            self.assertEqual(project["images"], [])
            self.assertTrue(details["published"])
            self.assertTrue(details["outcome"])
            self.assertIsNone(details["clientCode"])
            self.assertIsNone(details["serverCode"])

    def test_upsert_is_idempotent(self):
        client = mongo_client()
        collection = client.mindofshaun.projects_seed_test
        collection.drop()
        try:
            upsert_portfolio_projects(collection)
            upsert_portfolio_projects(collection)
            self.assertEqual(collection.count_documents({}), 2)
            family = collection.find_one({"project_details.title": "Family AHA"})
            self.assertEqual(family["images"], [])
            self.assertTrue(family["project_details"]["published"])
            self.assertIsInstance(family["created_at"], datetime)
            self.assertIsInstance(family["updated_at"], datetime)
        finally:
            collection.drop()
            client.close()


if __name__ == "__main__":
    unittest.main()
