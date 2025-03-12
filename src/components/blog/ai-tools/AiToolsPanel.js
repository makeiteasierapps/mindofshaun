import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, CircularProgress } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandIcon from '@mui/icons-material/Expand';
import ToolIconButton from './ToolIconButton';
import ToolResultsPanel from './ToolResultsPanel';
import SelectionPreview from './SelectionPreview';

const AiToolsPanel = ({
    loading,
    aiTools,
    aiResults,
    tone,
    selectedText,
    useSelectedTextOnly,
    onToggleUseSelectedTextOnly,
    onApplyToEditor,
}) => {
    const theme = useTheme();
    const [activeToolId, setActiveToolId] = useState(null);
    const [formattedResults, setFormattedResults] = useState({});

    // Process aiResults into a format suitable for ToolResultsPanel
    useEffect(() => {
        const newFormattedResults = {};

        // Introduction
        if (aiResults.introduction) {
            newFormattedResults['introduction'] = {
                title: 'Generate Introduction',
                content: aiResults.introduction,
            };
        }

        // Conclusion
        if (aiResults.conclusion) {
            newFormattedResults['conclusion'] = {
                title: 'Generate Conclusion',
                content: aiResults.conclusion,
            };
        }

        // Research Directions
        if (aiResults.researchDirections) {
            newFormattedResults['researchDirections'] = {
                title: 'Research Directions',
                content: aiResults.researchDirections,
            };
        }

        // Edited Content
        if (aiResults.editedContent) {
            newFormattedResults['editedContent'] = {
                title: 'Edit Content',
                content: aiResults.editedContent,
            };
        }

        // Adjusted Tone
        if (aiResults.adjustedTone) {
            newFormattedResults['adjustedTone'] = {
                title: 'Adjust Tone',
                content: aiResults.adjustedTone,
            };
        }

        // Organized Thoughts
        if (aiResults.organizedThoughts) {
            newFormattedResults['organizedThoughts'] = {
                title: 'Organize Thoughts',
                content: aiResults.organizedThoughts,
            };
        }

        // Expanded Points
        if (aiResults.expandedPoints) {
            newFormattedResults['expandedPoints'] = {
                title: 'Expand Points',
                content: aiResults.expandedPoints,
            };
        }

        setFormattedResults(newFormattedResults);
    }, [aiResults]);

    // Handle tool toggle
    const handleToolToggle = (toolId) => {
        setActiveToolId((prevId) => (prevId === toolId ? null : toolId));
    };

    // Handle applying content to editor
    const handleApplyToEditor = (toolId) => {
        let content;

        switch (toolId) {
            case 'introduction':
                // For introduction, we need to get the currently selected hook type
                // This will be handled by the IntroductionResult component internally
                content = aiResults.introduction;
                break;
            case 'conclusion':
                content = aiResults.conclusion.conclusion_paragraph;
                break;
            case 'researchDirections':
                content = aiResults.researchDirections.research_areas;
                break;
            case 'editedContent':
                content = aiResults.editedContent.content_feedback;
                break;
            case 'adjustedTone':
                content = aiResults.adjustedTone.adjusted_content;
                break;
            case 'organizedThoughts':
                content = aiResults.organizedThoughts.key_points;
                break;
            case 'expandedPoints':
                content = aiResults.expandedPoints.expanded_content;
                break;
            default:
                content = '';
                break;
        }

        if (onApplyToEditor && content) {
            onApplyToEditor(content);
        }
    };

    return (
        <>
            <Typography variant="subtitle1" gutterBottom color="text.primary">
                AI Tools
            </Typography>

            {selectedText && (
                <SelectionPreview
                    selectedText={selectedText}
                    useSelectedTextOnly={useSelectedTextOnly}
                    onToggleUseSelectedTextOnly={onToggleUseSelectedTextOnly}
                />
            )}

            <ToolResultsPanel
                selectedContent={
                    selectedText && useSelectedTextOnly ? selectedText : null
                }
                activeToolId={activeToolId}
                toolResults={formattedResults}
                onApplyToEditor={handleApplyToEditor}
            />

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 3,
                    }}
                >
                    <CircularProgress
                        sx={{ color: theme.palette.primary.light }}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    {/* Planning Tools */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            color="text.secondary"
                        >
                            Planning
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <ToolIconButton
                                id="organizedThoughts"
                                title="Organize Thoughts"
                                onClick={() => aiTools.organizeThoughts()}
                                icon={<FormatListBulletedIcon />}
                                hasResults={Boolean(
                                    aiResults.organizedThoughts
                                )}
                                isActive={activeToolId === 'organizedThoughts'}
                                onToggle={handleToolToggle}
                            />
                            <ToolIconButton
                                id="researchDirections"
                                title="Research Directions"
                                onClick={aiTools.generateResearchDirections}
                                icon={<SearchIcon />}
                                hasResults={Boolean(
                                    aiResults.researchDirections
                                )}
                                isActive={activeToolId === 'researchDirections'}
                                onToggle={handleToolToggle}
                            />
                        </Box>
                    </Box>

                    {/* Content Tools */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            color="text.secondary"
                        >
                            Content
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <ToolIconButton
                                id="introduction"
                                title="Generate Introduction"
                                onClick={aiTools.generateIntroduction}
                                icon={<TitleIcon />}
                                hasResults={Boolean(aiResults.introduction)}
                                isActive={activeToolId === 'introduction'}
                                onToggle={handleToolToggle}
                            />
                            <ToolIconButton
                                id="conclusion"
                                title="Generate Conclusion"
                                onClick={aiTools.generateConclusion}
                                icon={<DescriptionIcon />}
                                hasResults={Boolean(aiResults.conclusion)}
                                isActive={activeToolId === 'conclusion'}
                                onToggle={handleToolToggle}
                            />
                            <ToolIconButton
                                id="expandedPoints"
                                title="Expand Points"
                                onClick={() => aiTools.expandBriefPoints(tone)}
                                icon={<ExpandIcon />}
                                hasResults={Boolean(aiResults.expandedPoints)}
                                isActive={activeToolId === 'expandedPoints'}
                                onToggle={handleToolToggle}
                            />
                        </Box>
                    </Box>

                    {/* Editing Tools */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            color="text.secondary"
                        >
                            Editing
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <ToolIconButton
                                id="editedContent"
                                title="Edit Content"
                                onClick={() => aiTools.editContent(tone)}
                                icon={<EditIcon />}
                                hasResults={Boolean(aiResults.editedContent)}
                                isActive={activeToolId === 'editedContent'}
                                onToggle={handleToolToggle}
                            />
                            <ToolIconButton
                                id="adjustedTone"
                                title="Adjust Tone"
                                onClick={() => aiTools.adjustTone(tone)}
                                icon={<FormatColorTextIcon />}
                                hasResults={Boolean(aiResults.adjustedTone)}
                                isActive={activeToolId === 'adjustedTone'}
                                onToggle={handleToolToggle}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

AiToolsPanel.propTypes = {
    loading: PropTypes.bool.isRequired,
    aiTools: PropTypes.object.isRequired,
    aiResults: PropTypes.object.isRequired,
    tone: PropTypes.string.isRequired,
    selectedText: PropTypes.string,
    useSelectedTextOnly: PropTypes.bool,
    onToggleUseSelectedTextOnly: PropTypes.func,
    onApplyToEditor: PropTypes.func,
};

export default AiToolsPanel;
