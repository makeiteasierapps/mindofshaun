import blogAiService from '../utils/blogAiService';

/**
 * AI tool functions for the WritingEditor component
 */
const useWritingAiTools = (
    content,
    setLoading,
    aiResults,
    setAiResults,
    onContentChange,
    previewContent,
    setPreviewContent
) => {
    /**
     * Generates introduction options based on the content
     */
    const generateIntroduction = async () => {
        setLoading(true);
        try {
            // Extract the first line as the topic
            const topic = content.split('\n')[0];
            const result = await blogAiService.generateIntroduction(
                topic,
                'professional'
            );
            setAiResults((prev) => ({ ...prev, introduction: result }));
        } catch (error) {
            console.error('Error generating introduction:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Generates a conclusion based on the content
     */
    const generateConclusion = async () => {
        setLoading(true);
        try {
            const result = await blogAiService.generateConclusion(content);
            setAiResults((prev) => ({ ...prev, conclusion: result }));
        } catch (error) {
            console.error('Error generating conclusion:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Generates research directions based on the content
     */
    const generateResearchDirections = async () => {
        setLoading(true);
        try {
            // Extract the first line as the topic
            const topic = content.split('\n')[0];
            const result = await blogAiService.generateResearchDirections(
                topic
            );
            setAiResults((prev) => ({ ...prev, researchDirections: result }));
        } catch (error) {
            console.error('Error generating research directions:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Edits content based on the current tone
     */
    const editContent = async (tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.editContent(content, tone);
            setAiResults((prev) => ({ ...prev, editedContent: result }));
        } catch (error) {
            console.error('Error editing content:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Adjusts the tone of the content
     */
    const adjustTone = async (targetTone) => {
        setLoading(true);
        try {
            const result = await blogAiService.adjustTone(content, targetTone);
            setAiResults((prev) => ({ ...prev, adjustedTone: result }));
        } catch (error) {
            console.error('Error adjusting tone:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Organizes thoughts from raw content
     */
    const organizeThoughts = async () => {
        setLoading(true);
        try {
            const result = await blogAiService.organizeThoughts(content);
            setAiResults((prev) => ({ ...prev, organizedThoughts: result }));
        } catch (error) {
            console.error('Error organizing thoughts:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Expands brief points into detailed content
     */
    const expandBriefPoints = async (tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.expandBriefPoints(content, tone);
            setAiResults((prev) => ({ ...prev, expandedPoints: result }));
        } catch (error) {
            console.error('Error expanding brief points:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Applies the selected introduction type to the preview content
     */
    const applyIntroductionToPreview = (introType) => {
        if (!aiResults.introduction) return;

        const selectedIntro = aiResults.introduction[introType];
        if (!selectedIntro) return;

        const baseContent = previewContent || content;
        const newContent = selectedIntro + '\n\n' + baseContent;
        setPreviewContent(newContent);
    };

    /**
     * Applies organized thoughts to the preview content
     */
    const applyOrganizedThoughtsToPreview = () => {
        if (!aiResults.organizedThoughts) return;

        const thoughts = aiResults.organizedThoughts;
        let formattedThoughts = `# ${thoughts.blog_topic}\n\n`;

        formattedThoughts += '## Key Points\n';
        thoughts.key_points.forEach((point, index) => {
            formattedThoughts += `${index + 1}. ${point}\n`;
        });

        formattedThoughts += '\n## Suggested Structure\n';
        thoughts.structure.forEach((item, index) => {
            formattedThoughts += `${index + 1}. ${item}\n`;
        });

        formattedThoughts += '\n## Writing Prompts\n';
        thoughts.writing_prompts.forEach((prompt, index) => {
            formattedThoughts += `- ${prompt}\n`;
        });

        setPreviewContent(formattedThoughts);
    };

    /**
     * Applies the generated conclusion to the preview content
     */
    const applyConclusionToPreview = () => {
        if (!aiResults.conclusion?.conclusion_paragraph) return;

        const baseContent = previewContent || content;
        const newContent =
            baseContent + '\n\n' + aiResults.conclusion.conclusion_paragraph;
        setPreviewContent(newContent);
    };

    /**
     * Applies research directions to the preview content
     */
    const applyResearchDirectionsToPreview = () => {
        if (!aiResults.researchDirections?.research_areas) return;

        const baseContent = previewContent || content;
        const researchAreas = aiResults.researchDirections.research_areas;

        let researchSection = '\n\n## Further Research\n';
        researchAreas.forEach((area) => {
            researchSection += `- ${area}\n`;
        });

        const newContent = baseContent + researchSection;
        setPreviewContent(newContent);
    };

    /**
     * Applies edited content suggestions to the preview
     */
    const applyEditedContentToPreview = () => {
        if (!aiResults.editedContent) return;

        // Create a formatted version of the editing suggestions
        const suggestions = aiResults.editedContent;
        let formattedSuggestions = '## Editing Suggestions\n\n';

        if (suggestions.content_feedback) {
            formattedSuggestions += `### Content Feedback\n${suggestions.content_feedback}\n\n`;
        }

        if (suggestions.structure_suggestions) {
            formattedSuggestions += `### Structure Suggestions\n${suggestions.structure_suggestions}\n\n`;
        }

        if (suggestions.clarity_improvements) {
            formattedSuggestions += `### Clarity Improvements\n${suggestions.clarity_improvements}\n\n`;
        }

        setPreviewContent(formattedSuggestions);
    };

    /**
     * Applies adjusted tone content to the preview
     */
    const applyAdjustedToneToPreview = () => {
        if (!aiResults.adjustedTone?.adjusted_content) return;

        setPreviewContent(aiResults.adjustedTone.adjusted_content);
    };

    /**
     * Applies expanded points to the preview
     */
    const applyExpandedPointsToPreview = () => {
        if (!aiResults.expandedPoints?.expanded_content) return;

        setPreviewContent(aiResults.expandedPoints.expanded_content);
    };

    return {
        generateIntroduction,
        generateConclusion,
        generateResearchDirections,
        editContent,
        adjustTone,
        organizeThoughts,
        expandBriefPoints,
        applyIntroductionToPreview,
        applyConclusionToPreview,
        applyResearchDirectionsToPreview,
        applyEditedContentToPreview,
        applyAdjustedToneToPreview,
        applyExpandedPointsToPreview,
        applyOrganizedThoughtsToPreview,
    };
};

export default useWritingAiTools;
