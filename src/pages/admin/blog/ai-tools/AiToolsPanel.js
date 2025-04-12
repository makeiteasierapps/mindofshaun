import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Tooltip,
    Paper,
    IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandIcon from '@mui/icons-material/Expand';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AdjustedTone from './tools/AdjustedTone';
import Conclusion from './tools/Conclusion';
import EditedContent from './tools/EditedContent';
import ExpandedPoints from './tools/ExpandedPoints';
import Introductions from './tools/Introductions';
import OrganizedThoughts from './tools/OrganizedThoughts';
import ResearchDirections from './tools/ResearchDirections';
import SelectionPreview from './SelectionPreview';
import blogAiService from '../utils/blogAiService';
import { styled } from '@mui/material/styles';
import useWritingAiTools from '../hooks/useWritingAiTools';
import ToneAndPreviewControls from './ToneSelector';
import { PublishButton } from '../styles/WritingEditor.styles';
const ToolContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    overflowY: 'auto',
    elevation: 3,
}));

const TOOL_MAP = [
    {
        id: 'organizedThoughts',
        label: 'Organize',
        icon: <FormatListBulletedIcon />,
    },
    { id: 'researchDirections', label: 'Research', icon: <SearchIcon /> },
    { id: 'introduction', label: 'Intro', icon: <TitleIcon /> },
    { id: 'conclusion', label: 'Conclusion', icon: <DescriptionIcon /> },
    { id: 'expandedPoints', label: 'Expand', icon: <ExpandIcon /> },
    { id: 'editedContent', label: 'Edit', icon: <EditIcon /> },
    { id: 'adjustedTone', label: 'Tone', icon: <FormatColorTextIcon /> },
];

const AiToolsPanel = ({
    content,
    selectedText,
    tone,
    setTone,
    postId,
    onPublishingPackageReady,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [aiResults, setAiResults] = useState({
        introduction: null,
        conclusion: null,
        researchDirections: null,
        editedContent: null,
        adjustedTone: null,
        organizedThoughts: null,
        expandedPoints: null,
        publishingPackage: null,
    });

    // Initialize AI tools with the appropriate content and postId
    const aiTools = useWritingAiTools(setAiResults, setLoading, postId);

    // Load previously saved AI results on mount
    useEffect(() => {
        if (postId) {
            aiTools.loadSavedAiResults();
        }
    }, [postId]);

    const prepareForPublishing = useCallback(async () => {
        setLoading(true);
        try {
            const result = await blogAiService.preparePublishingPackage(
                content,
                tone,
                postId
            );
            onPublishingPackageReady(result);
        } catch (error) {
            console.error('Error preparing publishing package:', error);
        } finally {
            setLoading(false);
        }
    }, [content, onPublishingPackageReady]);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    // Get the content based on selection state
    const getActiveContent = () => {
        if (selectedText) {
            return selectedText;
        }
        return content;
    };

    // Handle generating content for the current tool
    const handleGenerate = async () => {
        const activeToolId = TOOL_MAP[tabIndex].id;

        switch (activeToolId) {
            case 'introduction':
                await aiTools.generateIntroduction(getActiveContent(), tone);
                break;
            case 'conclusion':
                await aiTools.generateConclusion(getActiveContent(), tone);
                break;
            case 'researchDirections':
                await aiTools.generateResearchDirections(getActiveContent());
                break;
            case 'editedContent':
                await aiTools.editContent(getActiveContent(), tone);
                break;
            case 'adjustedTone':
                await aiTools.adjustTone(getActiveContent(), tone);
                break;
            case 'organizedThoughts':
                await aiTools.organizeThoughts(getActiveContent());
                break;
            case 'expandedPoints':
                await aiTools.expandBlogContent(getActiveContent(), tone);
                break;
            default:
                break;
        }
    };

    // Render the results component based on the active tab
    const renderResultComponent = () => {
        const activeToolId = TOOL_MAP[tabIndex].id;
        const content = aiResults[activeToolId];

        switch (activeToolId) {
            case 'introduction':
                return <Introductions content={content} />;
            case 'conclusion':
                return <Conclusion content={content} />;
            case 'researchDirections':
                return <ResearchDirections content={content} />;
            case 'editedContent':
                return <EditedContent content={content} />;
            case 'adjustedTone':
                return <AdjustedTone content={content} />;
            case 'organizedThoughts':
                return <OrganizedThoughts content={content} />;
            case 'expandedPoints':
                return <ExpandedPoints content={content} />;
            default:
                return null;
        }
    };

    return (
        <>
            <ToneAndPreviewControls tone={tone} setTone={setTone} />

            <Box sx={{ mb: 2 }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiButtonBase-root.MuiTab-root': {
                            margin: '0px 20px 0px 0px',
                            padding: '0px',
                            minWidth: 'auto',
                            color: 'text.disabled', // dim color for unselected
                            '&.Mui-selected': {
                                color: 'text.secondary', // bright color for selected
                            },
                        },
                    }}
                >
                    {TOOL_MAP.map((tool, index) => (
                        <Tooltip title={tool.label} key={tool.id}>
                            <Tab icon={tool.icon} iconPosition="start" />
                        </Tooltip>
                    ))}
                </Tabs>
            </Box>

            <ToolContainer>
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: -8,
                            left: -8,
                            zIndex: 1,
                            padding: 0.5,
                        }}
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <AutoFixHighIcon />
                        )}
                    </IconButton>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="text.secondary"
                        align="center"
                    >
                        {TOOL_MAP[tabIndex].label} Results
                    </Typography>
                </Box>
                <SelectionPreview selectedText={selectedText} />
                {renderResultComponent()}
                <PublishButton
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        if (aiResults.publishingPackage) {
                            navigate(`/admin/posts/publish/${postId}`, {
                                state: {
                                    publishingPackage:
                                        aiResults.publishingPackage,
                                },
                            });
                        } else {
                            prepareForPublishing();
                        }
                    }}
                    disabled={!content.trim()}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(0, 115, 117, 0.3)',
                            color: 'rgba(255, 255, 255, 0.5)',
                        },
                    }}
                >
                    {loading
                        ? 'Preparing...'
                        : aiResults.publishingPackage
                        ? 'To Publishing Page'
                        : 'Prepare for Publishing'}
                </PublishButton>
            </ToolContainer>
        </>
    );
};

AiToolsPanel.propTypes = {
    content: PropTypes.string,
    loading: PropTypes.bool,
    aiResults: PropTypes.object,
    selectedText: PropTypes.string,
    tone: PropTypes.string.isRequired,
    setTone: PropTypes.func.isRequired,
    postId: PropTypes.string,
};

export default AiToolsPanel;
