import React, { useState } from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';
import { TagsInput } from '../styles/BlogAdmin.styles';

const TagInput = ({ tags, onTagsChange }) => {
    const [currentTag, setCurrentTag] = useState('');

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                const newTags = [...tags, currentTag.trim()];
                onTagsChange(newTags);
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        onTagsChange(newTags);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Tags</Typography>
            <TextField
                fullWidth
                placeholder="Add a tag and press Enter"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                margin="normal"
                size="small"
            />

            <TagsInput>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => removeTag(tag)}
                        size="small"
                    />
                ))}
            </TagsInput>
        </Box>
    );
};

export default TagInput;
