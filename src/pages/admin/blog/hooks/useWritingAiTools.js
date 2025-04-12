import blogAiService from '../utils/blogAiService';

/**
 * AI tool functions for the WritingEditor component
 */
const useWritingAiTools = (setAiResults, setLoading, postId) => {
    /**
     * Generates introduction options based on the content
     */
    const generateIntroduction = async (content, tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.generateIntroduction(
                content,
                tone,
                postId
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
    const generateConclusion = async (content, tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.generateConclusion(
                content,
                tone,
                postId
            );
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
    const generateResearchDirections = async (content) => {
        setLoading(true);
        try {
            const result = await blogAiService.generateResearchDirections(
                content,
                postId
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
    const editContent = async (content, tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.editContent(
                content,
                tone,
                postId
            );
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
    const adjustTone = async (content, targetTone) => {
        setLoading(true);
        try {
            const result = await blogAiService.adjustTone(
                content,
                targetTone,
                postId
            );
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
    const organizeThoughts = async (content) => {
        setLoading(true);
        try {
            const result = await blogAiService.organizeThoughts(
                content,
                postId
            );
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
    const expandBlogContent = async (content, tone) => {
        setLoading(true);
        try {
            const result = await blogAiService.expandBlogContent(
                content,
                tone,
                postId
            );
            setAiResults((prev) => ({ ...prev, expandedPoints: result }));
        } catch (error) {
            console.error('Error expanding blog content:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Loads previously saved AI results for this post
     */
    const loadSavedAiResults = async () => {
        if (!postId) return;

        setLoading(true);
        try {
            const results = await blogAiService.getAiResults(postId);
            setAiResults(results);
        } catch (error) {
            console.error('Error loading saved AI results:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        generateIntroduction,
        generateConclusion,
        generateResearchDirections,
        editContent,
        adjustTone,
        organizeThoughts,
        expandBlogContent,
        loadSavedAiResults,
    };
};

export default useWritingAiTools;
