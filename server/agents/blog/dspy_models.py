from dspy import Signature, InputField, OutputField

class ToneAdjuster(Signature):
    """Adjust the tone of content to match your brand voice."""

    blog_content = InputField(desc="Blog content to adjust")
    tone = InputField(desc="Desired tone for the blog")

    adjusted_content = OutputField(desc="Content rewritten in the target tone")
    word_choice_suggestions: list[str] = OutputField(desc="Specific vocabulary recommendations")

class ThoughtOrganizer(Signature):
    """Transform unorganized thoughts into structured blog ideas with writing prompts."""
    
    raw_thoughts = InputField(desc="User's unorganized thoughts, ideas, and ramblings")
    
    key_points: list[str] = OutputField(desc="Main ideas extracted and organized from the input")
    structure: list[str] = OutputField(desc="Suggested structure for the blog post")
    writing_prompts: list[str] = OutputField(desc="5-7 prompts to help start writing different sections")

class ContentEditor(Signature):
    """Review blog content and provide specific improvement suggestions."""
    
    blog_content = InputField(desc="Current blog draft")
    tone = InputField(desc="Desired tone for the blog")
    
    content_feedback = OutputField(desc="General assessment of the content strength and weaknesses")
    structure_suggestions: list[str] = OutputField(desc="Recommendations to improve the flow and organization")
    clarity_improvements: list[str] = OutputField(desc="Suggestions for clearer expression of ideas")

class TitleGenerator(Signature):
    """Generate engaging blog titles from content"""
    
    blog_content = InputField(desc="Full or partial blog content")
    tone = InputField(desc="Tone for the titles")
    
    attention_grabbing_titles: list[str] = OutputField(desc="5 attention-grabbing title options")
    seo_friendly_titles: list[str] = OutputField(desc="5 SEO-optimized title variations")

class ContentExpander(Signature):
    """Expand blog content into fully developed thoughts and paragraphs"""
    
    blog_content = InputField()
    tone = InputField(desc="Tone for the expanded content")
    
    expanded_content: list[str] = OutputField(desc="Fully developed paragraphs from the input points")
    transition_suggestions: list[str] = OutputField(desc="Smooth transitions between paragraphs")

class ResearchAssistant(Signature):
    """Suggest research directions to strengthen blog content."""
    
    blog_content = InputField()
    
    research_areas: list[str] = OutputField(desc="5-7 specific areas to research")
    statistics_needed: list[str] = OutputField(desc="Types of statistics that would strengthen the post")
    expert_perspectives: list[str] = OutputField(desc="Suggestions for expert viewpoints to include")
    counter_arguments: list[str] = OutputField(desc="Potential opposing views to address")

class ConclusionGenerator(Signature):
    """Create compelling conclusions that summarize and drive action."""
    
    blog_content = InputField(desc="Full or partial blog content")
    tone = InputField(desc="Tone for the conclusion")

    conclusion_paragraph = OutputField(desc="Strong concluding paragraph")
    key_takeaways: list[str] = OutputField(desc="3-5 main points for readers to remember")
    call_to_action = OutputField(desc="Engaging call to action")

class IntroductionHook(Signature):
    """Craft engaging introductions that hook readers immediately."""
    
    blog_content = InputField(desc="Blog content")
    tone = InputField(desc="Tone for the introduction")
    
    story_hook = OutputField(desc="Introduction using a narrative approach")
    question_hook = OutputField(desc="Introduction using thought-provoking questions")
    statistic_hook = OutputField(desc="Introduction using a striking statistic or fact")
    contrast_hook = OutputField(desc="Introduction using contrast or challenging expectations")