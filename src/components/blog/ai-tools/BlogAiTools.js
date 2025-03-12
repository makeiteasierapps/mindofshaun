import React from 'react';
import {
    Typography,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    AiToolsContainer,
    AiToolsCard,
    AiToolsForm,
    AiToolsLoadingContainer,
} from '../../styles/BlogAiTools.styles';

// Import custom hooks and components
import useAiTools from '../hooks/useAiTools';
import useAiToolHandlers from '../hooks/useAiToolHandlers';
import ToolOption from '../ToolOption';
import SelectionPreview from '../SelectionPreview';

/**
 * AI writing assistant component for blog content
 * @param {Object} props - Component props
 * @param {string} props.content - The content to process
 * @param {Function} props.onApplyChanges - Function to apply changes to the content
 * @returns {JSX.Element} - The rendered component
 */
const BlogAiTools = ({ content, onApplyChanges }) => {
    // Use the custom hook for AI tool operations
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
    } = useAiTools(content);

    // Use the custom hook for AI tool handlers
    const {
        handleOrganizeThoughts,
        handleEditContent,
        handleGenerateTitles,
        handleExpandPoints,
        handleResearchDirections,
        handleAdjustTone,
        handleGenerateConclusion,
        handleGenerateIntroduction,
    } = useAiToolHandlers(callAiService, textToProcess, targetAudience, tone);

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
