import { useState, useCallback } from 'react';

/**
 * Custom hook for managing AI tool operations
 * @param {string} initialContent - The initial content to process
 * @returns {Object} - The AI tool state and functions
 */
const useAiTools = (initialContent) => {
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [useSelectedTextOnly, setUseSelectedTextOnly] = useState(true);
    const [targetAudience, setTargetAudience] = useState('general');
    const [tone, setTone] = useState('professional');
    const [results, setResults] = useState({});

    // Get the text to process (either selected text or full content)
    const textToProcess = useCallback(() => {
        if (useSelectedTextOnly && selectedText) {
            return selectedText;
        }
        return initialContent;
    }, [initialContent, selectedText, useSelectedTextOnly]);

    // Handle text selection
    const handleTextSelection = useCallback(() => {
        const selection = window.getSelection();
        if (selection.toString()) {
            setSelectedText(selection.toString());
        }
    }, []);

    // Generic function to call any AI service
    const callAiService = useCallback(
        async (serviceFunction, params, resultKey) => {
            setLoading(true);
            try {
                const result = await serviceFunction(...params);
                setResults((prev) => ({ ...prev, [resultKey]: result }));
                return result;
            } catch (error) {
                console.error(`Error calling ${resultKey}:`, error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Clear a specific result
    const clearResult = useCallback((key) => {
        setResults((prev) => {
            const newResults = { ...prev };
            delete newResults[key];
            return newResults;
        });
    }, []);

    // Clear all results
    const clearAllResults = useCallback(() => {
        setResults({});
    }, []);

    return {
        loading,
        selectedText,
        setSelectedText,
        useSelectedTextOnly,
        setUseSelectedTextOnly,
        targetAudience,
        setTargetAudience,
        tone,
        setTone,
        results,
        textToProcess,
        handleTextSelection,
        callAiService,
        clearResult,
        clearAllResults,
    };
};

export default useAiTools;
