import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    IconButton,
    Drawer,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Divider,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import blogAiService from '../../utils/blogAiService';
import useWritingAiTools from './hooks/useWritingAiTools';
import {
    EditorContainer,
    ContentEditorWrapper,
    ContentEditor,
    SidebarToggle,
    SidebarContent,
    ToolButton,
    PreviewContainer,
    PublishButton,
    ResultPreview,
} from '../styles/WritingEditor.styles';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`sidebar-tabpanel-${index}`}
            aria-labelledby={`sidebar-tab-${index}`}
            style={{ height: '100%', overflowY: 'auto' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1, height: '100%' }}>{children}</Box>
            )}
        </div>
    );
};

const WritingEditor = ({
    content,
    onContentChange,
    onPublishingPackageReady,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [aiResults, setAiResults] = useState({
        introduction: null,
        conclusion: null,
        researchDirections: null,
        editedContent: null,
        adjustedTone: null,
        organizedThoughts: null,
        expandedPoints: null,
    });
    const [targetAudience, setTargetAudience] = useState('general');
    const [tone, setTone] = useState('professional');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Initialize AI tools
    const aiTools = useWritingAiTools(
        content,
        setLoading,
        aiResults,
        setAiResults,
        onContentChange
    );

    const prepareForPublishing = useCallback(async () => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const result = await blogAiService.preparePublishingPackage(
                content
            );
            onPublishingPackageReady(result);
        } catch (error) {
            console.error('Error preparing publishing package:', error);
        } finally {
            setLoading(false);
        }
    }, [content, onPublishingPackageReady]);

    return (
        <EditorContainer>
            <ContentEditorWrapper>
                <ContentEditor
                    placeholder="Start writing your blog post here..."
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                />
            </ContentEditorWrapper>

            <SidebarToggle onClick={toggleSidebar}>
                {sidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </SidebarToggle>

            <Drawer
                anchor="right"
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                variant="persistent"
                sx={{
                    width: sidebarOpen ? 350 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 350,
                        boxSizing: 'border-box',
                        height: 'calc(100vh - 200px)',
                        top: 'auto',
                        position: 'absolute',
                    },
                }}
            >
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
                                    overflowY: 'auto',
                                }}
                            >
                                {/* Settings */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Settings</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                            }}
                                        >
                                            <FormControl fullWidth size="small">
                                                <InputLabel>
                                                    Target Audience
                                                </InputLabel>
                                                <Select
                                                    value={targetAudience}
                                                    onChange={(e) =>
                                                        setTargetAudience(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Target Audience"
                                                >
                                                    <MenuItem value="general">
                                                        General
                                                    </MenuItem>
                                                    <MenuItem value="technical">
                                                        Technical
                                                    </MenuItem>
                                                    <MenuItem value="business">
                                                        Business
                                                    </MenuItem>
                                                    <MenuItem value="academic">
                                                        Academic
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth size="small">
                                                <InputLabel>Tone</InputLabel>
                                                <Select
                                                    value={tone}
                                                    onChange={(e) =>
                                                        setTone(e.target.value)
                                                    }
                                                    label="Tone"
                                                >
                                                    <MenuItem value="professional">
                                                        Professional
                                                    </MenuItem>
                                                    <MenuItem value="casual">
                                                        Casual
                                                    </MenuItem>
                                                    <MenuItem value="formal">
                                                        Formal
                                                    </MenuItem>
                                                    <MenuItem value="friendly">
                                                        Friendly
                                                    </MenuItem>
                                                    <MenuItem value="authoritative">
                                                        Authoritative
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>

                                {/* Organize Thoughts */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>
                                            Organize Thoughts
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={aiTools.organizeThoughts}
                                            size="small"
                                            fullWidth
                                        >
                                            Organize My Thoughts
                                        </ToolButton>

                                        {aiResults.organizedThoughts && (
                                            <ResultPreview>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Blog Topic:
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                >
                                                    {
                                                        aiResults
                                                            .organizedThoughts
                                                            .blog_topic
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Key Points:
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                >
                                                    <ul
                                                        style={{
                                                            paddingLeft: '16px',
                                                            margin: '4px 0',
                                                        }}
                                                    >
                                                        {aiResults.organizedThoughts.key_points.map(
                                                            (point, index) => (
                                                                <li key={index}>
                                                                    {point}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Structure:
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                >
                                                    <ol
                                                        style={{
                                                            paddingLeft: '16px',
                                                            margin: '4px 0',
                                                        }}
                                                    >
                                                        {aiResults.organizedThoughts.structure.map(
                                                            (item, index) => (
                                                                <li key={index}>
                                                                    {item}
                                                                </li>
                                                            )
                                                        )}
                                                    </ol>
                                                </Typography>
                                            </ResultPreview>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                {/* Introduction */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Introduction</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={
                                                aiTools.generateIntroduction
                                            }
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

                                                {aiResults.introduction
                                                    .story_hook && (
                                                    <ResultPreview>
                                                        <Typography
                                                            variant="caption"
                                                            color="textSecondary"
                                                        >
                                                            Preview (Story
                                                            Hook):
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {
                                                                aiResults
                                                                    .introduction
                                                                    .story_hook
                                                            }
                                                        </Typography>
                                                    </ResultPreview>
                                                )}
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                {/* Expand Brief Points */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Expand Points</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                aiTools.expandBriefPoints(tone)
                                            }
                                            size="small"
                                            fullWidth
                                        >
                                            Expand Brief Points
                                        </ToolButton>

                                        {aiResults.expandedPoints && (
                                            <Box sx={{ mt: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={
                                                        aiTools.applyExpandedPoints
                                                    }
                                                    fullWidth
                                                >
                                                    Apply Expanded Content
                                                </Button>

                                                <ResultPreview>
                                                    <Typography
                                                        variant="caption"
                                                        color="textSecondary"
                                                    >
                                                        Preview:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {aiResults.expandedPoints.expanded_content.substring(
                                                            0,
                                                            200
                                                        )}
                                                        ...
                                                    </Typography>
                                                </ResultPreview>
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                {/* Edit Content */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Edit Content</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                aiTools.editContent(
                                                    targetAudience,
                                                    tone
                                                )
                                            }
                                            size="small"
                                            fullWidth
                                        >
                                            Get Editing Suggestions
                                        </ToolButton>

                                        {aiResults.editedContent && (
                                            <ResultPreview>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Content Feedback:
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                >
                                                    {
                                                        aiResults.editedContent
                                                            .content_feedback
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Structure Suggestions:
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                >
                                                    {
                                                        aiResults.editedContent
                                                            .structure_suggestions
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    Clarity Improvements:
                                                </Typography>
                                                <Typography variant="body2">
                                                    {
                                                        aiResults.editedContent
                                                            .clarity_improvements
                                                    }
                                                </Typography>
                                            </ResultPreview>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                {/* Adjust Tone */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Adjust Tone</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                aiTools.adjustTone(tone)
                                            }
                                            size="small"
                                            fullWidth
                                        >
                                            Adjust Content Tone
                                        </ToolButton>

                                        {aiResults.adjustedTone && (
                                            <Box sx={{ mt: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={
                                                        aiTools.applyAdjustedTone
                                                    }
                                                    fullWidth
                                                >
                                                    Apply Adjusted Tone
                                                </Button>

                                                <ResultPreview>
                                                    <Typography
                                                        variant="caption"
                                                        color="textSecondary"
                                                    >
                                                        Preview:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {aiResults.adjustedTone.adjusted_content.substring(
                                                            0,
                                                            200
                                                        )}
                                                        ...
                                                    </Typography>
                                                </ResultPreview>
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                {/* Conclusion */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Conclusion</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                                    onClick={
                                                        aiTools.applyConclusion
                                                    }
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
                                    </AccordionDetails>
                                </Accordion>

                                {/* Research Directions */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>Research Ideas</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToolButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={
                                                aiTools.generateResearchDirections
                                            }
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
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                >
                                                    <ul
                                                        style={{
                                                            paddingLeft: '16px',
                                                            margin: '4px 0',
                                                        }}
                                                    >
                                                        {aiResults.researchDirections.research_areas.map(
                                                            (area, index) => (
                                                                <li key={index}>
                                                                    {area}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </Typography>
                                            </ResultPreview>
                                        )}
                                    </AccordionDetails>
                                </Accordion>

                                <PublishButton
                                    variant="contained"
                                    color="secondary"
                                    onClick={prepareForPublishing}
                                    sx={{ mt: 'auto', mb: 2 }}
                                >
                                    Ready to Publish
                                </PublishButton>
                            </Box>
                        )}
                    </TabPanel>

                    <TabPanel value={activeTab} index={1}>
                        <PreviewContainer>
                            <Typography
                                variant="body1"
                                sx={{ whiteSpace: 'pre-wrap' }}
                            >
                                {content}
                            </Typography>
                        </PreviewContainer>
                    </TabPanel>
                </SidebarContent>
            </Drawer>
        </EditorContainer>
    );
};

export default WritingEditor;
