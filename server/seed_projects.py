#!/usr/bin/env python3
"""Seed the mindofshaun portfolio projects. Safe to run more than once."""

import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient


def portfolio_projects():
    return [
        {
            "images": [],
            "project_details": {
                "title": "Family AHA",
                "description": (
                    "Daily family connection app with guided prompts, shared memories, "
                    "and AI family portraits (Flux image-to-image). React, FastAPI, "
                    "MongoDB, Stripe, and Ory Kratos. Deployed with the GitOps platform "
                    "below. Built and owned by Shaun."
                ),
                "outcome": "A billed, authenticated product in production, not a prototype.",
                "clientCode": None,
                "serverCode": None,
                "clientTech": ["React"],
                "serverTech": ["FastAPI", "MongoDB", "Stripe", "Ory Kratos", "Flux"],
                "published": True,
            },
        },
        {
            "images": [],
            "project_details": {
                "title": "Hosting platform",
                "description": (
                    "Single-operator PaaS: FluxCD GitOps, a deploy UI, secrets, DNS, "
                    "monitoring, and backups. Built so deploying a full-stack app is "
                    "straightforward. It began around one app template; the direction is "
                    "general hosting for any app, not a stack locked to that template."
                ),
                "outcome": (
                    "The system that runs Family AHA, aimed at hosting more than one "
                    "kind of application."
                ),
                "clientCode": None,
                "serverCode": None,
                "clientTech": ["Deploy UI"],
                "serverTech": ["FluxCD", "GitOps", "DNS", "Monitoring", "Backups"],
                "published": True,
            },
        },
    ]


def upsert_portfolio_projects(collection):
    now = datetime.now(timezone.utc)
    for project in portfolio_projects():
        collection.update_one(
            {"project_details.title": project["project_details"]["title"]},
            {
                "$set": {
                    "images": project["images"],
                    "project_details": project["project_details"],
                    "updated_at": now,
                },
                "$setOnInsert": {"created_at": now},
            },
            upsert=True,
        )


def main():
    load_dotenv(Path(__file__).resolve().parent / ".env", override=True)
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    client = MongoClient(uri, serverSelectionTimeoutMS=3000)
    upsert_portfolio_projects(client["mindofshaun"]["projects"])
    client.close()


if __name__ == "__main__":
    main()
