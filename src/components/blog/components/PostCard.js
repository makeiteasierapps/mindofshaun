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

const PostCard = ({
    post,
    index,
    onTagClick,
    onFullScreenClick,
    transitionDelay = 0,
}) => {
    return (
        <Fade
            in={true}
            timeout={1000}
            style={{ transitionDelay: `${transitionDelay}ms` }}
        >
            <GlassmorphicCard>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Typography variant="h5" component="h3" gutterBottom>
                            {post.title}
                        </Typography>
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
                        <Typography variant="body2" paragraph>
                            {post.summary}
                        </Typography>
                    )}

                    <Typography variant="body1" paragraph>
                        {post.content.length > 300
                            ? `${post.content.substring(0, 300)}...`
                            : post.content}
                    </Typography>

                    {post.content.length > 300 && (
                        <Button
                            variant="contained"
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

export default PostCard;
