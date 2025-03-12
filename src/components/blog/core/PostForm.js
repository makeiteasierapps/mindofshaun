import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { GlassmorphicCard } from '../styles/BlogAdmin.styles';
import WritingEditor from '../editor/WritingEditor';
import PublishingEditor from '../editor/PublishingEditor';

const DEFAULT_AUTHOR = 'Shaun Offenbacher';

const PostForm = ({ editingPost, onSubmit, onCancel }) => {
    const [content, setContent] = useState('');
    const [publishingPackage, setPublishingPackage] = useState(null);
    const [isWritingMode, setIsWritingMode] = useState(true);
    const [initialData, setInitialData] = useState({
        title: '',
        summary: '',
        author: DEFAULT_AUTHOR,
        tags: [],
        published: false,
    });

    // Update form when editing post changes
    useEffect(() => {
        if (editingPost) {
            setContent(editingPost.content || '');
            setInitialData({
                title: editingPost.title || '',
                summary: editingPost.summary || '',
                author: DEFAULT_AUTHOR,
                tags: editingPost.tags || [],
                published: editingPost.published || false,
            });
        } else {
            // Reset form when not editing
            setContent('');
            setInitialData({
                title: '',
                summary: '',
                author: DEFAULT_AUTHOR,
                tags: [],
                published: false,
            });
        }
        // Always start in writing mode
        setIsWritingMode(true);
        setPublishingPackage(null);
    }, [editingPost]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handlePublishingPackageReady = (packageData) => {
        setPublishingPackage(packageData);
        setIsWritingMode(false);
    };

    const handleBackToWriting = () => {
        setIsWritingMode(true);
    };

    const handleSubmit = (formData) => {
        onSubmit(formData);
    };

    return (
        <GlassmorphicCard>
            <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                </Typography>

                {isWritingMode ? (
                    <WritingEditor
                        content={content}
                        onContentChange={handleContentChange}
                        onPublishingPackageReady={handlePublishingPackageReady}
                    />
                ) : (
                    <PublishingEditor
                        content={content}
                        publishingPackage={publishingPackage}
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        onBack={handleBackToWriting}
                    />
                )}

                {isWritingMode && editingPost && (
                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button variant="contained" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Box>
                )}
            </CardContent>
        </GlassmorphicCard>
    );
};

export default PostForm;
