import React from 'react';
import { Box, Typography, Chip, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlassmorphicCard } from '../styles/BlogAdmin.styles';

const PostItem = ({ post, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <GlassmorphicCard>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box>
                        <Typography variant="h5" component="h3">
                            {post.title}{' '}
                            {!post.published && (
                                <Chip
                                    label="Draft"
                                    size="small"
                                    color="default"
                                />
                            )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {post.author && `By ${post.author} • `}
                            {formatDate(post.created_at)}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={onEdit} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={onDelete} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        mt: 1,
                        mb: 2,
                    }}
                >
                    {post.tags &&
                        post.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                </Box>

                {post.summary && (
                    <Typography
                        variant="body2"
                        sx={{ fontStyle: 'italic', mb: 1 }}
                    >
                        {post.summary}
                    </Typography>
                )}

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content}
                </Typography>
            </CardContent>
        </GlassmorphicCard>
    );
};

export default PostItem;
