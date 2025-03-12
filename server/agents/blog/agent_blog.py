from dspy import ChainOfThought
import json
from server.agents.blog.dspy_models import *

# Tools for during the writing process
def generate_introduction(blog_content, tone):
    """Craft engaging introductions that hook readers immediately."""
    introduction_hook = ChainOfThought(IntroductionHook)
    prediction = introduction_hook(blog_content=blog_content, tone=tone)
    introduction = {
        "story_hook": prediction.story_hook,
        "question_hook": prediction.question_hook,
        "statistic_hook": prediction.statistic_hook,
        "contrast_hook": prediction.contrast_hook,
    }
    return introduction

def organize_thoughts(raw_thoughts):
    """Organize unorganized thoughts into structured blog ideas with writing prompts."""
    thought_organizer = ChainOfThought(ThoughtOrganizer)
    prediction = thought_organizer(raw_thoughts=raw_thoughts)
    organized_thoughts = {
        "blog_topic": prediction.blog_topic,
        "key_points": prediction.key_points,
        "structure": prediction.structure,
        "writing_prompts": prediction.writing_prompts,
    }
    return organized_thoughts

def expand_brief_points(brief_points, tone):
    """Expand brief points into fully developed paragraphs."""
    content_expander = ChainOfThought(ContentExpander)
    prediction = content_expander(brief_points=brief_points, tone=tone)
    expanded_content = {
        "expanded_content": prediction.expanded_content,
        "transition_suggestions": prediction.transition_suggestions,
    }
    return expanded_content

def generate_research_directions(blog_topic):
    """Suggest research directions to strengthen blog content."""
    research_assistant = ChainOfThought(ResearchAssistant)
    prediction = research_assistant(blog_topic=blog_topic)
    research_directions = {
        "research_areas": prediction.research_areas,
        "statistics_needed": prediction.statistics_needed,
        "expert_perspectives": prediction.expert_perspectives,
        "counter_arguments": prediction.counter_arguments,
    }
    return research_directions

def generate_conclusion(blog_content, tone):
    """Create compelling conclusions that summarize and drive action."""
    conclusion_generator = ChainOfThought(ConclusionGenerator)
    prediction = conclusion_generator(blog_content=blog_content, tone=tone)
    conclusion = {
        "conclusion_paragraph": prediction.conclusion_paragraph,
        "key_takeaways": prediction.key_takeaways,
        "call_to_action": prediction.call_to_action,
    }
    return conclusion

# Post writing tools
def summarize_blog(blog_content):
    """Summarize the blog content into a concise overview."""
    summarize = ChainOfThought("blog_content -> summary")
    return summarize(blog_content=blog_content).summary

def create_blog_tags(blog_content):
    """Create relevant tags for the blog content."""
    tags = ChainOfThought("blog_content -> tags: list[str]")
    return tags(blog_content=blog_content).tags

def edit_content(draft_content, tone):
    """Review blog content and provide specific improvement suggestions."""
    content_editor = ChainOfThought(ContentEditor)
    prediction = content_editor(draft_content=draft_content, tone=tone)
    edited_content = {
        "content_feedback": prediction.content_feedback,
        "structure_suggestions": prediction.structure_suggestions,
        "clarity_improvements": prediction.clarity_improvements,
    }
    return edited_content

def adjust_tone(content, target_tone):
    """Adjust the tone of content to match your brand voice."""
    tone_adjuster = ChainOfThought(ToneAdjuster)
    prediction = tone_adjuster(content=content, target_tone=target_tone)
    adjusted_content = {
        "adjusted_content": prediction.adjusted_content,
        "tone_analysis": prediction.tone_analysis,
        "word_choice_suggestions": prediction.word_choice_suggestions,
    }
    return adjusted_content

def generate_titles(blog_content, tone):
    """Generate engaging blog titles from content or topic."""
    title_generator = ChainOfThought(TitleGenerator)
    prediction = title_generator(blog_content=blog_content, tone=tone)
    titles = {
        "clickable_titles": prediction.clickable_titles,
        "seo_friendly_titles": prediction.seo_friendly_titles,
        "title_analysis": prediction.title_analysis,
    }
    return titles

def prepare_publishing_package(blog_content, tone):
    """Create a complete publishing package with titles, summary, and tags."""
    # Get title options
    titles = generate_titles(blog_content, tone)
    
    # Get summary
    summary = summarize_blog(blog_content)
    
    # Get tags
    tags = create_blog_tags(blog_content)
    
    publishing_package = {
        "title_options": titles,
        "blog_summary": summary,
        "suggested_tags": tags,
        "meta_description": summary[:160] if len(summary) > 160 else summary,  # SEO-friendly meta description
    }
    return publishing_package







