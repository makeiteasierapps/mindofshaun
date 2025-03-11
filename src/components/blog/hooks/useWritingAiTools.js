import { useCallback } from 'react';
import blogAiService from '../../../utils/blogAiService';

const useWritingAiTools = (
    content,
    setLoading,
    aiResults,
    setAiResults,
    onContentChange
) => {
    // Introduction
    const generateIntroduction = useCallback(async () => {
        if (!content.trim()) return;

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
    }, [content, setLoading, setAiResults]);

    const applyIntroduction = useCallback(
        (introType) => {
            if (!aiResults.introduction) return;

            const selectedIntro = aiResults.introduction[introType];
            if (!selectedIntro) return;

            const newContent = selectedIntro + '\n\n' + content;
            onContentChange(newContent);
        },
        [aiResults.introduction, content, onContentChange]
    );

    // Conclusion
    const generateConclusion = useCallback(async () => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const result = await blogAiService.generateConclusion(content);
            setAiResults((prev) => ({ ...prev, conclusion: result }));
        } catch (error) {
            console.error('Error generating conclusion:', error);
        } finally {
            setLoading(false);
        }
    }, [content, setLoading, setAiResults]);

    const applyConclusion = useCallback(() => {
        if (!aiResults.conclusion?.conclusion_paragraph) return;

        const newContent =
            content + '\n\n' + aiResults.conclusion.conclusion_paragraph;
        onContentChange(newContent);
    }, [aiResults.conclusion, content, onContentChange]);

    // Research Directions
    const generateResearchDirections = useCallback(async () => {
        if (!content.trim()) return;

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
    }, [content, setLoading, setAiResults]);

    // Edit Content
    const editContent = useCallback(
        async (targetAudience = 'general', tone = 'professional') => {
            if (!content.trim()) return;

            setLoading(true);
            try {
                const result = await blogAiService.editContent(
                    content,
                    targetAudience,
                    tone
                );
                setAiResults((prev) => ({ ...prev, editedContent: result }));
            } catch (error) {
                console.error('Error editing content:', error);
            } finally {
                setLoading(false);
            }
        },
        [content, setLoading, setAiResults]
    );

    // Adjust Tone
    const adjustTone = useCallback(
        async (targetTone = 'professional') => {
            if (!content.trim()) return;

            setLoading(true);
            try {
                const result = await blogAiService.adjustTone(
                    content,
                    targetTone
                );
                setAiResults((prev) => ({ ...prev, adjustedTone: result }));
            } catch (error) {
                console.error('Error adjusting tone:', error);
            } finally {
                setLoading(false);
            }
        },
        [content, setLoading, setAiResults]
    );

    const applyAdjustedTone = useCallback(() => {
        if (!aiResults.adjustedTone?.adjusted_content) return;

        onContentChange(aiResults.adjustedTone.adjusted_content);
    }, [aiResults.adjustedTone, onContentChange]);

    // Organize Thoughts
    const organizeThoughts = useCallback(async () => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const result = await blogAiService.organizeThoughts(content);
            setAiResults((prev) => ({ ...prev, organizedThoughts: result }));
        } catch (error) {
            console.error('Error organizing thoughts:', error);
        } finally {
            setLoading(false);
        }
    }, [content, setLoading, setAiResults]);

    // Expand Brief Points
    const expandBriefPoints = useCallback(
        async (desiredTone = 'professional') => {
            if (!content.trim()) return;

            setLoading(true);
            try {
                const result = await blogAiService.expandBriefPoints(
                    content,
                    desiredTone
                );
                setAiResults((prev) => ({ ...prev, expandedPoints: result }));
            } catch (error) {
                console.error('Error expanding brief points:', error);
            } finally {
                setLoading(false);
            }
        },
        [content, setLoading, setAiResults]
    );

    const applyExpandedPoints = useCallback(() => {
        if (!aiResults.expandedPoints?.expanded_content) return;

        onContentChange(aiResults.expandedPoints.expanded_content);
    }, [aiResults.expandedPoints, onContentChange]);

    return {
        generateIntroduction,
        applyIntroduction,
        generateConclusion,
        applyConclusion,
        generateResearchDirections,
        editContent,
        adjustTone,
        applyAdjustedTone,
        organizeThoughts,
        expandBriefPoints,
        applyExpandedPoints,
    };
};

export default useWritingAiTools;
