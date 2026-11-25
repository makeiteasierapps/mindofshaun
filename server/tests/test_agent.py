import pytest
from pydantic import ValidationError
from pydantic_ai.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart
from pydantic_ai.models.function import FunctionModel
from pydantic_ai.models.test import TestModel

from app.agent import HISTORY_MESSAGES, AppPlan, agent, present_app_plan


def sample_plan(**overrides) -> dict:
    data = {
        "idea_one_liner": "A short evening ritual for a family.",
        "who_its_for": "A parent with two kids.",
        "core_features": ["Daily card", "Story", "Letter"],
        "ai_uses": [{"use": "Draft the card", "why": "The copy changes daily", "model_type": "writing model"}],
        "human_or_rule_based": "A person approves the first week of prompts.",
        "phases": [{"name": "Scope", "rough_duration_range": "a call", "goal": "Name what is in and out."}],
        "risks": ["Facts a child might remember need sources."],
        "next_step": "Book a call.",
    }
    data.update(overrides)
    return data


def test_off_topic_redirect_does_not_call_the_plan_tool():
    seen: dict[str, object] = {}

    def respond(messages, info):
        seen["instructions"] = info.instructions
        seen["tools"] = [tool.name for tool in info.function_tools]
        return ModelResponse(
            parts=[
                TextPart(
                    content="I can talk about Shaun's work, his process, hiring him, or a plan for an app."
                )
            ]
        )

    with agent.override(model=FunctionModel(respond)):
        result = agent.run_sync("What's the weather in Paris tomorrow?")

    instructions = seen["instructions"]
    assert isinstance(instructions, str)
    assert "Only discuss Shaun's work" in instructions
    assert "redirect" in instructions.lower()
    assert "Family AHA" in instructions
    assert "PLACEHOLDER, Shaun will refine" in instructions
    assert "present_app_plan" in seen["tools"]
    assert "work" in result.output
    tool_names = [
        getattr(part, "tool_name", None)
        for message in result.all_messages()
        for part in getattr(message, "parts", [])
    ]
    assert "present_app_plan" not in tool_names


def test_app_plan_schema_and_tool_result():
    with pytest.raises(ValidationError):
        AppPlan.model_validate(sample_plan(core_features=["one", "two"]))
    with pytest.raises(ValidationError):
        AppPlan.model_validate(sample_plan(core_features=["1", "2", "3", "4", "5", "6", "7"]))

    assert present_app_plan(AppPlan.model_validate(sample_plan())) == "shown"

    features = AppPlan.model_json_schema()["properties"]["core_features"]
    assert features["minItems"] == 3
    assert features["maxItems"] == 6

    model = TestModel(call_tools=[])
    with agent.override(model=model):
        agent.run_sync("Sketch a plan for a family ritual app.")
    names = [tool.name for tool in model.last_model_request_parameters.function_tools]
    assert "present_app_plan" in names


def test_history_keeps_the_last_twelve_messages():
    seen: dict[str, int] = {}

    def respond(messages, info):
        seen["count"] = len(messages)
        return ModelResponse(parts=[TextPart(content="ok")])

    history = []
    for index in range(20):
        history.append(ModelRequest(parts=[UserPromptPart(content=f"user {index}")]))
        history.append(ModelResponse(parts=[TextPart(content=f"assistant {index}")]))

    with agent.override(model=FunctionModel(respond)):
        agent.run_sync("latest", message_history=history)

    assert seen["count"] == HISTORY_MESSAGES
