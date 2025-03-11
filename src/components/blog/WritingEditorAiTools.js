import blogAiService from '../../utils/blogAiService';

/**
 * AI tool functions for the WritingEditor component
 */
export const useWritingAiTools = (
    content,
    setLoading,
    aiResults,
    setAiResults,
    onContentChange
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
                'general'
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
     * Applies the selected introduction type to the content
     */
    const applyIntroduction = (introType) => {
        if (!aiResults.introduction) return;

        const selectedIntro = aiResults.introduction[introType];
        if (!selectedIntro) return;

        const newContent = selectedIntro + '\n\n' + content;
        onContentChange(newContent);
    };

    /**
     * Applies the generated conclusion to the content
     */
    const applyConclusion = () => {
        if (!aiResults.conclusion?.conclusion_paragraph) return;

        const newContent =
            content + '\n\n' + aiResults.conclusion.conclusion_paragraph;
        onContentChange(newContent);
    };

    /**
     * Prepares the content for publishing
     */
    const prepareForPublishing = async (onPublishingPackageReady) => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const result = await blogAiService.preparePublishingPackage(
                content
            );
            console.log(result);
            onPublishingPackageReady(result);
        } catch (error) {
            console.error('Error preparing publishing package:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        generateIntroduction,
        generateConclusion,
        generateResearchDirections,
        applyIntroduction,
        applyConclusion,
        prepareForPublishing,
    };
};
