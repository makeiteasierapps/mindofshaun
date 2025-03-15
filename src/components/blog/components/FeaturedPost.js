import React from 'react';
import {
    Box,
    Typography,
    CardContent,
    Chip,
    Button,
    IconButton,
    Tooltip,
    Fade,
} from '@mui/material';
import { GlassmorphicCard, TagsContainer } from '../styles/Blog.styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { formatDate } from '../utils/blogUtils';

const FeaturedPost = ({ post, onTagClick, onFullScreenClick }) => {
    if (!post) return null;

    return (
        <Fade in={true} timeout={1000}>
            <GlassmorphicCard
                sx={{
                    mb: 4,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    transform: 'scale(1.02)',
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box>
                            <Typography variant="overline" color="primary">
                                Latest Post
                            </Typography>
                            <Typography
                                variant="h4"
                                component="h3"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
                        </Box>
                        <Tooltip title="Read in full screen">
                            <IconButton onClick={onFullScreenClick}>
                                <FullscreenIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                    >
                        {post.author && `By ${post.author} • `}
                        {formatDate(post.created_at)}
                    </Typography>

                    <TagsContainer>
                        {post.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                onClick={() => onTagClick(tag)}
                            />
                        ))}
                    </TagsContainer>

                    {post.summary && (
                        <Typography
                            variant="subtitle1"
                            paragraph
                            sx={{ fontStyle: 'italic' }}
                        >
                            {post.summary}
                        </Typography>
                    )}

                    <Typography variant="body1" paragraph>
                        {post.content.length > 500
                            ? `${post.content.substring(0, 500)}...`
                            : post.content}
                    </Typography>

                    {post.content.length > 500 && (
                        <Button
                            variant="outlined"
                            onClick={onFullScreenClick}
                            sx={{ mt: 2 }}
                        >
                            Continue Reading
                        </Button>
                    )}
                </CardContent>
            </GlassmorphicCard>
        </Fade>
    );
};

export default FeaturedPost;
