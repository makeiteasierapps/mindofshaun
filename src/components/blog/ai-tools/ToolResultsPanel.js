import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import styled from '@mui/material/styles/styled';
import {
    AdjustedToneResult,
    ConclusionResult,
    EditedContentResult,
    ExpandedPointsResult,
    IntroductionResult,
    OrganizedThoughtsResult,
    ResearchDirectionsResult,
} from './results';
import { ContentSection } from './results/styles';

const ResultsContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: '400px',
    overflowY: 'auto',
}));

const ToolResultsPanel = ({
    selectedContent,
    activeToolId,
    toolResults,
    onApplyToEditor,
}) => {
    const theme = useTheme();

    // If no tool is active or no results, show empty state
    if (
        !activeToolId ||
        !toolResults ||
        Object.keys(toolResults).length === 0
    ) {
        return (
            <ResultsContainer>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    Select a tool to see results here
                </Typography>
            </ResultsContainer>
        );
    }

    // Get the active tool's results
    const activeResult = toolResults[activeToolId];
    if (!activeResult) {
        return (
            <ResultsContainer>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    No results available for this tool
                </Typography>
            </ResultsContainer>
        );
    }

    // Render the appropriate result component based on the active tool
    const renderResultComponent = () => {
        const { content } = activeResult;

        switch (activeToolId) {
            case 'introduction':
                return <IntroductionResult data={content} />;
            case 'conclusion':
                return <ConclusionResult data={content} />;
            case 'researchDirections':
                return <ResearchDirectionsResult data={content} />;
            case 'editedContent':
                return <EditedContentResult data={content} />;
            case 'adjustedTone':
                return <AdjustedToneResult data={content} />;
            case 'organizedThoughts':
                return <OrganizedThoughtsResult data={content} />;
            case 'expandedPoints':
                return <ExpandedPointsResult data={content} />;
            default:
                // Fallback to JSON display if no specific component
                return (
                    <Typography variant="body2">
                        {typeof content === 'string'
                            ? content
                            : JSON.stringify(content, null, 2)}
                    </Typography>
                );
        }
    };

    return (
        <ResultsContainer>
            <Typography variant="subtitle1" gutterBottom color="primary.main">
                {activeResult.title} Results
            </Typography>

            {selectedContent && (
                <>
                    <Typography variant="caption" color="text.secondary">
                        Selected Content:
                    </Typography>
                    <ContentSection>
                        <Typography variant="body2">
                            {selectedContent}
                        </Typography>
                    </ContentSection>
                    <Divider sx={{ my: 2 }} />
                </>
            )}

            {renderResultComponent()}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onApplyToEditor(activeToolId)}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                    }}
                >
                    Apply to Content
                </Button>
            </Box>
        </ResultsContainer>
    );
};

ToolResultsPanel.propTypes = {
    selectedContent: PropTypes.string,
    activeToolId: PropTypes.string,
    toolResults: PropTypes.object,
    onApplyToEditor: PropTypes.func.isRequired,
};

export default ToolResultsPanel;
