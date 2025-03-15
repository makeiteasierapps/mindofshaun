import React, { useState, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton,
    Drawer,
    Typography,
    Divider,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send';
import blogAiService from '../utils/blogAiService';
import useWritingAiTools from '../hooks/useWritingAiTools';
import AiToolsPanel from '../ai-tools/AiToolsPanel';
import ToneAndPreviewControls from './ToneAndPreviewControls';
import PreviewArea from './PreviewArea';
import {
    EditorContainer,
    ContentEditorWrapper,
    ContentEditor,
    SidebarToggle,
    SidebarContent,
    PublishButton,
} from '../styles/WritingEditor.styles';

const WritingEditor = ({
    content,
    onContentChange,
    onPublishingPackageReady,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
    const [tone, setTone] = useState('professional');
    const [previewContent, setPreviewContent] = useState('');
    const [selectionMenuAnchor, setSelectionMenuAnchor] = useState(null);
    const [selectedText, setSelectedText] = useState('');
    const [useSelectedTextOnly, setUseSelectedTextOnly] = useState(true);
    const [cursorPosition, setCursorPosition] = useState(null);

    const editorRef = useRef(null);
    const theme = useTheme();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Initialize AI tools with preview content
    const aiTools = useWritingAiTools(
        content,
        setLoading,
        aiResults,
        setAiResults,
        onContentChange,
        previewContent,
        setPreviewContent
    );

    // Handle text selection for AI tools
    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            setSelectedText(selection.toString().trim());

            // Store cursor position for later insertion
            if (editorRef.current) {
                setCursorPosition(editorRef.current.selectionStart);
            }
        } else {
            setSelectedText('');
        }
    };

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

    // Send entire content to preview
    const sendToPreview = () => {
        setPreviewContent(content);
    };

    // Apply preview content to main editor
    const applyPreviewToMain = () => {
        if (previewContent.trim()) {
            onContentChange(previewContent);
        }
    };

    // Handle text selection for context menu
    const handleSelectionMenu = (event) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            setSelectionMenuAnchor(event.currentTarget);
            handleTextSelection();
        }
    };

    // Close selection menu
    const handleCloseSelectionMenu = () => {
        setSelectionMenuAnchor(null);
    };

    // Send selected text to preview
    const sendSelectionToPreview = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            setPreviewContent(selection.toString());
        }
        handleCloseSelectionMenu();
    };

    // Apply AI-generated content directly to the editor at cursor position
    const applyContentToEditor = (newContent) => {
        if (!newContent) return;

        // If we have a cursor position, insert at that position
        if (cursorPosition !== null && editorRef.current) {
            const beforeCursor = content.substring(0, cursorPosition);
            const afterCursor = content.substring(cursorPosition);

            // Add a newline before and after the new content if needed
            const formattedNewContent =
                (beforeCursor.endsWith('\n') ? '' : '\n') +
                newContent +
                (afterCursor.startsWith('\n') ? '' : '\n');

            const newFullContent =
                beforeCursor + formattedNewContent + afterCursor;
            onContentChange(newFullContent);

            // Update cursor position to after the inserted content
            const newPosition = cursorPosition + formattedNewContent.length;
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.focus();
                    editorRef.current.setSelectionRange(
                        newPosition,
                        newPosition
                    );
                }
            }, 0);
        } else {
            // If no cursor position, append to the end
            const newFullContent = content + '\n\n' + newContent;
            onContentChange(newFullContent);
        }

        // Clear the preview content after applying
        setPreviewContent('');
    };

    return (
        <EditorContainer>
            <ContentEditorWrapper>
                <ContentEditor
                    ref={editorRef}
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    placeholder="Start writing your blog post here..."
                    onMouseUp={(e) => {
                        handleSelectionMenu(e);
                        handleTextSelection();
                    }}
                    onKeyUp={handleTextSelection}
                />
                <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <Tooltip title="Send to Preview">
                        <IconButton
                            onClick={sendToPreview}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.primary.light,
                                },
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Selection Menu */}
                <Menu
                    anchorEl={selectionMenuAnchor}
                    open={Boolean(selectionMenuAnchor)}
                    onClose={handleCloseSelectionMenu}
                    PaperProps={{
                        sx: {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                        },
                    }}
                >
                    <MenuItem
                        onClick={sendSelectionToPreview}
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 178, 181, 0.1)',
                            },
                        }}
                    >
                        <SendIcon
                            fontSize="small"
                            sx={{ mr: 1, color: theme.palette.primary.light }}
                        />
                        Send to Preview
                    </MenuItem>
                </Menu>
            </ContentEditorWrapper>

            <SidebarToggle
                onClick={toggleSidebar}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                    },
                    transition: 'right 0.3s',
                    right: sidebarOpen ? '330px' : '-20px', // Adjust position based on sidebar state
                }}
                aria-label={
                    sidebarOpen
                        ? 'Close writing assistant'
                        : 'Open writing assistant'
                }
            >
                {sidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </SidebarToggle>

            <Drawer
                variant="persistent"
                anchor="right"
                open={sidebarOpen}
                sx={{
                    width: 350,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 350,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        zIndex: 1200, // Ensure it's below the toggle button
                    },
                }}
            >
                <SidebarContent>
                    <Typography variant="h6" gutterBottom color="text.primary">
                        Writing Assistant
                    </Typography>

                    <ToneAndPreviewControls
                        tone={tone}
                        setTone={setTone}
                        previewContent={previewContent}
                        applyPreviewToMain={applyPreviewToMain}
                    />

                    <Divider
                        sx={{ mb: 2, borderColor: theme.palette.primary.light }}
                    />

                    <PreviewArea previewContent={previewContent} />

                    <Divider
                        sx={{ my: 2, borderColor: theme.palette.primary.light }}
                    />

                    <AiToolsPanel
                        loading={loading}
                        aiTools={aiTools}
                        aiResults={aiResults}
                        tone={tone}
                        selectedText={selectedText}
                        useSelectedTextOnly={useSelectedTextOnly}
                        onToggleUseSelectedTextOnly={() =>
                            setUseSelectedTextOnly(!useSelectedTextOnly)
                        }
                        onApplyToEditor={applyContentToEditor}
                    />

                    <PublishButton
                        variant="contained"
                        fullWidth
                        onClick={prepareForPublishing}
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
                        Prepare for Publishing
                    </PublishButton>
                </SidebarContent>
            </Drawer>
        </EditorContainer>
    );
};

export default WritingEditor;
