import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
    CardContent,
    Divider,
    Grid2,
} from '@mui/material';
import TagInput from '../core/TagInput';
import {
    PublishingCard,
    FormContainer,
    ActionButton,
} from '../styles/PublishingEditor.styles';

import TitleGenerator from '../ai-tools/tools/TitleGenerator';
const DEFAULT_AUTHOR = 'Shaun Offenbacher';

const PublishingEditor = ({
    content,
    publishingPackage,
    initialData = {},
    onSubmit,
    onBack,
}) => {
    const [publishingFormFields, setPublishingFormFields] = useState({
        title: '',
        summary: '',
        author: DEFAULT_AUTHOR,
        tags: [],
        published: false,
        ...initialData,
    });

    // Update form when publishing package changes
    useEffect(() => {
        if (publishingPackage) {
            // Don't override existing data if we already have it
            setPublishingFormFields((prev) => ({
                ...prev,
                summary: prev.summary || publishingPackage.blog_summary || '',
                tags: prev.tags.length
                    ? prev.tags
                    : publishingPackage.suggested_tags || [],
            }));
        }
    }, [publishingPackage]);

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setPublishingFormFields({
            ...publishingFormFields,
            [name]: name === 'published' ? checked : value,
        });
    };

    const handleTagsChange = (newTags) => {
        setPublishingFormFields({
            ...publishingFormFields,
            tags: newTags,
        });
    };

    const selectTitle = (title) => {
        setPublishingFormFields({
            ...publishingFormFields,
            title,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...publishingFormFields,
            content,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <PublishingCard>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Prepare for Publishing
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <FormContainer>
                        {publishingPackage?.title_options && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Suggested Titles
                                </Typography>

                                <Box>
                                    <TitleGenerator
                                        content={
                                            publishingPackage.title_options
                                        }
                                        onSelectTitle={selectTitle}
                                    />
                                </Box>
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={publishingFormFields.title}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Summary"
                            name="summary"
                            value={publishingFormFields.summary}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />

                        <TagInput
                            tags={publishingFormFields.tags}
                            onTagsChange={handleTagsChange}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={publishingFormFields.published}
                                    onChange={handleInputChange}
                                    name="published"
                                />
                            }
                            label="Published"
                        />

                        <Grid2 container spacing={2} sx={{ mt: 2 }}>
                            <Grid2 item xs={6}>
                                <ActionButton
                                    variant="outlined"
                                    fullWidth
                                    onClick={onBack}
                                >
                                    Back to Writing
                                </ActionButton>
                            </Grid2>
                            <Grid2 item xs={6}>
                                <ActionButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    {initialData.title
                                        ? 'Update Post'
                                        : 'Create Post'}
                                </ActionButton>
                            </Grid2>
                        </Grid2>
                    </FormContainer>
                </CardContent>
            </PublishingCard>
        </Box>
    );
};

export default PublishingEditor;
