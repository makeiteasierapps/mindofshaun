import React, { useState, useCallback} from 'react';
import {
    Typography,
    CircularProgress,
    AccordionSummary,
    AccordionDetails,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    FormControlLabel,
    Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import blogAiService from '../../utils/blogAiService';
import {
    AiToolsContainer,
    AiToolsCard,
    AiToolsAccordion,
    AiToolsButton,
    AiToolsForm,
    AiToolsPreview,
    AiToolsLoadingContainer,
    AiToolsResultContainer,
} from '../styles/BlogAiTools.styles';

// Custom hook for managing AI tool operations
const useAiTool = (initialContent) => {
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

// Tool option component
const ToolOption = ({ title, onExecute, resultKey, result, onApply }) => {
    return (
        <AiToolsAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AiToolsButton
                    variant="contained"
                    onClick={onExecute}
                    fullWidth
                >
                    Execute
                </AiToolsButton>
                {result && (
                    <AiToolsResultContainer>
                        <Typography variant="h6" gutterBottom>
                            Results
                        </Typography>
                        <AiToolsPreview>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </AiToolsPreview>
                        <AiToolsButton
                            variant="contained"
                            color="primary"
                            onClick={() => onApply(result)}
                            sx={{ mt: 2 }}
                        >
                            Apply Changes
                        </AiToolsButton>
                    </AiToolsResultContainer>
                )}
            </AccordionDetails>
        </AiToolsAccordion>
    );
};

// Selection preview component
const SelectionPreview = ({
    selectedText,
    useSelectedTextOnly,
    onToggleUseSelected,
}) => {
    if (!selectedText) return null;

    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                Selected Text:
            </Typography>
            <AiToolsPreview>
                <Typography variant="body2">{selectedText}</Typography>
            </AiToolsPreview>
            <FormControlLabel
                control={
                    <Switch
                        checked={useSelectedTextOnly}
                        onChange={(e) => onToggleUseSelected(e.target.checked)}
                    />
                }
                label="Use selected text only"
                sx={{ mt: 1 }}
            />
        </Box>
    );
};

// Main component
const BlogAiTools = ({ content, onApplyChanges }) => {
    const {
        loading,
        selectedText,
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
    } = useAiTool(content);

    // Handler functions for each AI tool
    const handleOrganizeThoughts = useCallback(() => {
        callAiService(
            blogAiService.organizeThoughts,
            [textToProcess()],
            'organizedThoughts'
        );
    }, [callAiService, textToProcess]);

    const handleEditContent = useCallback(() => {
        callAiService(
            blogAiService.editContent,
            [textToProcess(), targetAudience, tone],
            'editedContent'
        );
    }, [callAiService, textToProcess, targetAudience, tone]);

    const handleGenerateTitles = useCallback(() => {
        callAiService(
            blogAiService.generateTitles,
            [textToProcess(), textToProcess().split('\n')[0]],
            'titles'
        );
    }, [callAiService, textToProcess]);

    const handleExpandPoints = useCallback(() => {
        callAiService(
            blogAiService.expandBriefPoints,
            [textToProcess(), tone],
            'expandedPoints'
        );
    }, [callAiService, textToProcess, tone]);

    const handleResearchDirections = useCallback(() => {
        callAiService(
            blogAiService.generateResearchDirections,
            [textToProcess().split('\n')[0]],
            'researchDirections'
        );
    }, [callAiService, textToProcess]);

    const handleAdjustTone = useCallback(() => {
        callAiService(
            blogAiService.adjustTone,
            [textToProcess(), tone],
            'adjustedTone'
        );
    }, [callAiService, textToProcess, tone]);

    const handleGenerateConclusion = useCallback(() => {
        callAiService(
            blogAiService.generateConclusion,
            [textToProcess()],
            'conclusion'
        );
    }, [callAiService, textToProcess]);

    const handleGenerateIntroduction = useCallback(() => {
        callAiService(
            blogAiService.generateIntroduction,
            [textToProcess().split('\n')[0], targetAudience],
            'introduction'
        );
    }, [callAiService, textToProcess, targetAudience]);

    return (
        <AiToolsContainer onMouseUp={handleTextSelection}>
            <AiToolsCard>
                <Typography variant="h5" gutterBottom>
                    AI Writing Assistant
                </Typography>

                <SelectionPreview
                    selectedText={selectedText}
                    useSelectedTextOnly={useSelectedTextOnly}
                    onToggleUseSelected={setUseSelectedTextOnly}
                />

                <AiToolsForm>
                    <FormControl fullWidth>
                        <InputLabel>Target Audience</InputLabel>
                        <Select
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            label="Target Audience"
                        >
                            <MenuItem value="general">General</MenuItem>
                            <MenuItem value="technical">Technical</MenuItem>
                            <MenuItem value="business">Business</MenuItem>
                            <MenuItem value="academic">Academic</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Tone</InputLabel>
                        <Select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            label="Tone"
                        >
                            <MenuItem value="professional">
                                Professional
                            </MenuItem>
                            <MenuItem value="casual">Casual</MenuItem>
                            <MenuItem value="formal">Formal</MenuItem>
                            <MenuItem value="friendly">Friendly</MenuItem>
                            <MenuItem value="authoritative">
                                Authoritative
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {loading ? (
                        <AiToolsLoadingContainer>
                            <CircularProgress />
                        </AiToolsLoadingContainer>
                    ) : (
                        <>
                            <ToolOption
                                title="Organize Thoughts"
                                onExecute={handleOrganizeThoughts}
                                result={results.organizedThoughts}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Edit Content"
                                onExecute={handleEditContent}
                                result={results.editedContent}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Generate Titles"
                                onExecute={handleGenerateTitles}
                                result={results.titles}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Expand Points"
                                onExecute={handleExpandPoints}
                                result={results.expandedPoints}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Research Directions"
                                onExecute={handleResearchDirections}
                                result={results.researchDirections}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Adjust Tone"
                                onExecute={handleAdjustTone}
                                result={results.adjustedTone}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Generate Conclusion"
                                onExecute={handleGenerateConclusion}
                                result={results.conclusion}
                                onApply={onApplyChanges}
                            />

                            <ToolOption
                                title="Generate Introduction"
                                onExecute={handleGenerateIntroduction}
                                result={results.introduction}
                                onApply={onApplyChanges}
                            />
                        </>
                    )}
                </AiToolsForm>
            </AiToolsCard>
        </AiToolsContainer>
    );
};

export default BlogAiTools;
