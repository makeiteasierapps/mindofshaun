import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Typography } from '@mui/material';
import { usePosts } from '../../../../contexts/PostsContext';

import {
    EditorContainer,
    ContentEditor,
    SidebarToggle,
} from '../styles/WritingEditor.styles';

import WritingAssistant from './WritingAssistant';

const WritingEditor = ({
    content,
    setContent,
    onPublishingPackageReady,
    postId,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [autoSaveStatus, setAutoSaveStatus] = useState('');
    const editorRef = useRef(null);
    const autoSaveTimerRef = useRef(null);
    const theme = useTheme();
    const { updatePost } = usePosts();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const onContentChange = (value) => {
        setContent(value);

        // Reset the auto-save timer whenever content changes
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        // Only set up auto-save if we have a postId
        if (postId) {
            // Auto-save after 3 seconds of inactivity
            autoSaveTimerRef.current = setTimeout(() => {
                handleAutoSave(value);
            }, 3000);
        }
    };

    const handleAutoSave = async (contentToSave) => {
        if (!postId) return;

        try {
            setAutoSaveStatus('saving');
            await updatePost(postId, { content: contentToSave });
            setAutoSaveStatus('saved');

            // Clear the saved status after 2 seconds
            setTimeout(() => {
                setAutoSaveStatus('');
            }, 2000);
        } catch (error) {
            console.error('Error auto-saving post:', error);
            setAutoSaveStatus('error');
        }
    };

    // Clear the auto-save timer when component unmounts
    useEffect(() => {
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, []);

    // Handle text selection for AI tools
    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            setSelectedText(selection.toString().trim());
        } else {
            setSelectedText('');
        }
    };

    return (
        <EditorContainer>
            <ContentEditor
                ref={editorRef}
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Start writing your blog post here..."
                onMouseUp={(e) => {
                    handleTextSelection();
                }}
                onKeyUp={handleTextSelection}
            />

            {autoSaveStatus && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: sidebarOpen ? '340px' : '10px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor:
                            autoSaveStatus === 'saved'
                                ? 'rgba(76, 175, 80, 0.1)'
                                : autoSaveStatus === 'error'
                                ? 'rgba(244, 67, 54, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        transition: 'right 0.3s',
                    }}
                >
                    <Typography
                        variant="caption"
                        color={
                            autoSaveStatus === 'saved'
                                ? 'success.main'
                                : autoSaveStatus === 'error'
                                ? 'error.main'
                                : 'text.secondary'
                        }
                    >
                        {autoSaveStatus === 'saved'
                            ? 'Auto-saved'
                            : autoSaveStatus === 'error'
                            ? 'Auto-save failed'
                            : 'Auto-saving...'}
                    </Typography>
                </Box>
            )}

            <WritingAssistant
                content={content}
                onPublishingPackageReady={onPublishingPackageReady}
                sidebarOpen={sidebarOpen}
                selectedText={selectedText}
                postId={postId}
            />
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
        </EditorContainer>
    );
};

export default WritingEditor;
