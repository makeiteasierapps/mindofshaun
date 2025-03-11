import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Divider,
    Button,
} from '@mui/material';
import TabPanel from './TabPanel';
import {
    SidebarContent,
    ToolButton,
    PreviewContainer,
    PublishButton,
    ResultPreview,
} from '../styles/WritingEditor.styles';

/**
 * Sidebar component for the WritingEditor
 */
const WritingEditorSidebar = ({
    activeTab,
    handleTabChange,
    loading,
    aiResults,
    content,
    aiTools,
    onPublishingPackageReady,
}) => {
    return (
        <SidebarContent>
            <Typography variant="h6" gutterBottom>
                Writing Assistant
            </Typography>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 2 }}
            >
                <Tab label="Tools" />
                <Tab label="Preview" />
            </Tabs>

            <Divider sx={{ mb: 2 }} />

            <TabPanel value={activeTab} index={0}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 3,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            height: '100%',
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Introduction
                            </Typography>
                            <ToolButton
                                variant="outlined"
                                color="primary"
                                onClick={aiTools.generateIntroduction}
                                size="small"
                                fullWidth
                            >
                                Generate Introduction
                            </ToolButton>

                            {aiResults.introduction && (
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption">
                                        Choose a hook style:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                            flexWrap: 'wrap',
                                            mt: 0.5,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() =>
                                                aiTools.applyIntroduction(
                                                    'story_hook'
                                                )
                                            }
                                        >
                                            Story
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() =>
                                                aiTools.applyIntroduction(
                                                    'question_hook'
                                                )
                                            }
                                        >
                                            Question
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() =>
                                                aiTools.applyIntroduction(
                                                    'statistic_hook'
                                                )
                                            }
                                        >
                                            Statistic
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() =>
                                                aiTools.applyIntroduction(
                                                    'contrast_hook'
                                                )
                                            }
                                        >
                                            Contrast
                                        </Button>
                                    </Box>

                                    {aiResults.introduction.story_hook && (
                                        <ResultPreview>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Preview (Story Hook):
                                            </Typography>
                                            <Typography variant="body2">
                                                {
                                                    aiResults.introduction
                                                        .story_hook
                                                }
                                            </Typography>
                                        </ResultPreview>
                                    )}
                                </Box>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Conclusion
                            </Typography>
                            <ToolButton
                                variant="outlined"
                                color="primary"
                                onClick={aiTools.generateConclusion}
                                size="small"
                                fullWidth
                            >
                                Generate Conclusion
                            </ToolButton>

                            {aiResults.conclusion && (
                                <Box sx={{ mt: 1 }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={aiTools.applyConclusion}
                                        fullWidth
                                    >
                                        Apply Conclusion
                                    </Button>

                                    <ResultPreview>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                        >
                                            Preview:
                                        </Typography>
                                        <Typography variant="body2">
                                            {
                                                aiResults.conclusion
                                                    .conclusion_paragraph
                                            }
                                        </Typography>
                                    </ResultPreview>
                                </Box>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Research Directions
                            </Typography>
                            <ToolButton
                                variant="outlined"
                                color="primary"
                                onClick={aiTools.generateResearchDirections}
                                size="small"
                                fullWidth
                            >
                                Generate Research Ideas
                            </ToolButton>

                            {aiResults.researchDirections && (
                                <ResultPreview>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        Research Areas:
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <ul
                                            style={{
                                                paddingLeft: '16px',
                                                margin: '4px 0',
                                            }}
                                        >
                                            {aiResults.researchDirections.research_areas.map(
                                                (area, index) => (
                                                    <li key={index}>{area}</li>
                                                )
                                            )}
                                        </ul>
                                    </Typography>
                                </ResultPreview>
                            )}
                        </Box>

                        <PublishButton
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                aiTools.prepareForPublishing(
                                    onPublishingPackageReady
                                )
                            }
                            sx={{ mt: 'auto' }}
                        >
                            Ready to Publish
                        </PublishButton>
                    </Box>
                )}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
                <PreviewContainer>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {content}
                    </Typography>
                </PreviewContainer>
            </TabPanel>
        </SidebarContent>
    );
};

export default WritingEditorSidebar;
