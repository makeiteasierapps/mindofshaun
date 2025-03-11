import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    CardContent,
    Chip,
    Divider,
    Grid,
} from '@mui/material';
import TagInput from './TagInput';
import {
    PublishingCard,
    TitleOption,
    ContentPreview,
    FormContainer,
    ActionButton,
} from '../styles/PublishingEditor.styles';

const DEFAULT_AUTHOR = 'Shaun Offenbacher';

const PublishingEditor = ({
    content,
    publishingPackage,
    initialData = {},
    onSubmit,
    onBack,
}) => {
    const [formData, setFormData] = useState({
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
            setFormData((prev) => ({
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
        setFormData({
            ...formData,
            [name]: name === 'published' ? checked : value,
        });
    };

    const handleTagsChange = (newTags) => {
        setFormData({
            ...formData,
            tags: newTags,
        });
    };

    const selectTitle = (title) => {
        setFormData({
            ...formData,
            title,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
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
                                    {publishingPackage.title_options.clickable_titles?.map(
                                        (title, index) => (
                                            <TitleOption
                                                key={index}
                                                fullWidth
                                                selected={
                                                    formData.title === title
                                                }
                                                onClick={() =>
                                                    selectTitle(title)
                                                }
                                            >
                                                {title}
                                            </TitleOption>
                                        )
                                    )}

                                    {publishingPackage.title_options.seo_friendly_titles?.map(
                                        (title, index) => (
                                            <TitleOption
                                                key={`seo-${index}`}
                                                fullWidth
                                                selected={
                                                    formData.title === title
                                                }
                                                onClick={() =>
                                                    selectTitle(title)
                                                }
                                            >
                                                {title}
                                            </TitleOption>
                                        )
                                    )}
                                </Box>
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />

                        <TagInput
                            tags={formData.tags}
                            onTagsChange={handleTagsChange}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.published}
                                    onChange={handleInputChange}
                                    name="published"
                                />
                            }
                            label="Published"
                        />

                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <ActionButton
                                    variant="outlined"
                                    fullWidth
                                    onClick={onBack}
                                >
                                    Back to Writing
                                </ActionButton>
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                        </Grid>
                    </FormContainer>
                </CardContent>
            </PublishingCard>

            {/* Preview section */}
            <PublishingCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Content Preview
                    </Typography>
                    <ContentPreview>{content}</ContentPreview>
                </CardContent>
            </PublishingCard>
        </Box>
    );
};

export default PublishingEditor;
