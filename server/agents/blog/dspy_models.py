from dspy import Signature, InputField, OutputField

class ThoughtOrganizer(Signature):
    """Transform unorganized thoughts into structured blog ideas with writing prompts."""
    
    raw_thoughts = InputField(desc="User's unorganized thoughts, ideas, and ramblings")
    
    blog_topic = OutputField(desc="A clear, focused blog topic based on the input")
    key_points = OutputField(desc="Main ideas extracted and organized from the input")
    structure = OutputField(desc="Suggested structure for the blog post")
    writing_prompts = OutputField(desc="5-7 prompts to help start writing different sections")
    target_audience = OutputField(desc="Suggested target audience for this content")

class ContentEditor(Signature):
    """Review blog content and provide specific improvement suggestions."""
    
    draft_content = InputField(desc="Current blog draft")
    target_audience = InputField(desc="Intended audience for the blog post", default="general readers")
    tone = InputField(desc="Desired tone for the blog", default="informative")
    
    content_feedback = OutputField(desc="General assessment of the content strength and weaknesses")
    structure_suggestions = OutputField(desc="Recommendations to improve the flow and organization")
    clarity_improvements = OutputField(desc="Suggestions for clearer expression of ideas")
    engagement_tips = OutputField(desc="Ways to make the content more engaging for readers")
    specific_edits = OutputField(desc="3-5 specific sentences or paragraphs to revise with suggestions")

class TitleGenerator(Signature):
    """Generate engaging blog titles from content or topic."""
    
    blog_content = InputField(desc="Full or partial blog content")
    
    clickable_titles: list[str] = OutputField(desc="5 attention-grabbing title options")
    seo_friendly_titles: list[str] = OutputField(desc="3 SEO-optimized title variations")
    title_analysis: list[str] = OutputField(desc="Brief explanation of what makes these titles effective")

class ContentExpander(Signature):
    """Expand brief points into fully developed paragraphs."""
    
    brief_points = InputField(desc="Bullet points or short sentences to expand")
    desired_tone = InputField(desc="Tone for the expanded content", default="conversational")
    
    expanded_content = OutputField(desc="Fully developed paragraphs from the input points")
    transition_suggestions = OutputField(desc="Smooth transitions between paragraphs")

class ResearchAssistant(Signature):
    """Suggest research directions to strengthen blog content."""
    
    blog_topic = InputField(desc="Main topic or current draft of the blog")
    
    research_areas = OutputField(desc="5-7 specific areas to research")
    statistics_needed = OutputField(desc="Types of statistics that would strengthen the post")
    expert_perspectives = OutputField(desc="Suggestions for expert viewpoints to include")
    counter_arguments = OutputField(desc="Potential opposing views to address")

class ToneAdjuster(Signature):
    """Adjust the tone of content to match your brand voice."""
    
    content = InputField(desc="Blog content to adjust")
    target_tone = InputField(desc="Desired tone (e.g., professional, casual, inspirational)")
    
    adjusted_content = OutputField(desc="Content rewritten in the target tone")
    tone_analysis = OutputField(desc="Analysis of the original tone and changes made")
    word_choice_suggestions = OutputField(desc="Specific vocabulary recommendations")

class ConclusionGenerator(Signature):
    """Create compelling conclusions that summarize and drive action."""
    
    blog_content = InputField(desc="Full or partial blog content")
    
    conclusion_paragraph = OutputField(desc="Strong concluding paragraph")
    key_takeaways = OutputField(desc="3-5 main points for readers to remember")
    call_to_action = OutputField(desc="Engaging call to action")

class IntroductionHook(Signature):
    """Craft engaging introductions that hook readers immediately."""
    
    blog_topic = InputField(desc="Blog topic or title")
    target_audience = InputField(desc="Intended readers", default="general audience")
    
    story_hook = OutputField(desc="Introduction using a narrative approach")
    question_hook = OutputField(desc="Introduction using thought-provoking questions")
    statistic_hook = OutputField(desc="Introduction using a striking statistic or fact")
    contrast_hook = OutputField(desc="Introduction using contrast or challenging expectations")