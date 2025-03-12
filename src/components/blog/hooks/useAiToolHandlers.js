import { useCallback } from 'react';
import blogAiService from '../../../utils/blogAiService';

/**
 * Custom hook for AI tool handler functions
 * @param {Function} callAiService - Function to call AI services
 * @param {Function} textToProcess - Function to get the text to process
 * @param {string} targetAudience - The target audience
 * @param {string} tone - The desired tone
 * @returns {Object} - The AI tool handler functions
 */
const useAiToolHandlers = (
    callAiService,
    textToProcess,
    targetAudience,
    tone
) => {
    // Handler for organizing thoughts
    const handleOrganizeThoughts = useCallback(() => {
        callAiService(
            blogAiService.organizeThoughts,
            [textToProcess()],
            'organizedThoughts'
        );
    }, [callAiService, textToProcess]);

    // Handler for editing content
    const handleEditContent = useCallback(() => {
        callAiService(
            blogAiService.editContent,
            [textToProcess(), targetAudience, tone],
            'editedContent'
        );
    }, [callAiService, textToProcess, targetAudience, tone]);

    // Handler for generating titles
    const handleGenerateTitles = useCallback(() => {
        callAiService(
            blogAiService.generateTitles,
            [textToProcess(), textToProcess().split('\n')[0]],
            'titles'
        );
    }, [callAiService, textToProcess]);

    // Handler for expanding points
    const handleExpandPoints = useCallback(() => {
        callAiService(
            blogAiService.expandBriefPoints,
            [textToProcess(), tone],
            'expandedPoints'
        );
    }, [callAiService, textToProcess, tone]);

    // Handler for generating research directions
    const handleResearchDirections = useCallback(() => {
        callAiService(
            blogAiService.generateResearchDirections,
            [textToProcess().split('\n')[0]],
            'researchDirections'
        );
    }, [callAiService, textToProcess]);

    // Handler for adjusting tone
    const handleAdjustTone = useCallback(() => {
        callAiService(
            blogAiService.adjustTone,
            [textToProcess(), tone],
            'adjustedTone'
        );
    }, [callAiService, textToProcess, tone]);

    // Handler for generating conclusion
    const handleGenerateConclusion = useCallback(() => {
        callAiService(
            blogAiService.generateConclusion,
            [textToProcess()],
            'conclusion'
        );
    }, [callAiService, textToProcess]);

    // Handler for generating introduction
    const handleGenerateIntroduction = useCallback(() => {
        callAiService(
            blogAiService.generateIntroduction,
            [textToProcess().split('\n')[0], targetAudience],
            'introduction'
        );
    }, [callAiService, textToProcess, targetAudience]);

    return {
        handleOrganizeThoughts,
        handleEditContent,
        handleGenerateTitles,
        handleExpandPoints,
        handleResearchDirections,
        handleAdjustTone,
        handleGenerateConclusion,
        handleGenerateIntroduction,
    };
};

export default useAiToolHandlers;
