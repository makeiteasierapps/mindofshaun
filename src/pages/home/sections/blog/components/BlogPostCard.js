import React from 'react';
import {
    Box,
    Typography,
    CardContent,
    Button,
    Fade,
} from '@mui/material';
import { TagsContainer } from '../BlogMain.styles';
import { FrostedGlassBox, StyledChip } from '../../../../../components/shared/styles';
import { formatDate } from '../../../../../utils/utils';

const BlogPostCard = ({
    post,
    onFullScreenClick,
    featured = false,
    transitionDelay = 0,
}) => {
    if (!post) return null;

    // Content preview length is different for featured vs regular posts
    const contentPreviewLength = featured ? 500 : 300;

    // Title variant is different for featured posts
    const titleVariant = featured ? 'h4' : 'h5';

    return (
        <Fade
            in={true}
            timeout={1000}
            style={
                transitionDelay > 0
                    ? { transitionDelay: `${transitionDelay}ms` }
                    : undefined
            }
        >
            <FrostedGlassBox featured={featured}>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box>
                            {featured && (
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                >
                                    Latest Post
                                </Typography>
                            )}
                            <Typography
                                variant={titleVariant}
                                component="h3"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
                        </Box>
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
                            <StyledChip key={tag} label={tag} size="small" />
                        ))}
                    </TagsContainer>

                    {post.summary && (
                        <Typography
                            variant={featured ? 'subtitle1' : 'body2'}
                            component="p"
                            sx={featured ? { fontStyle: 'italic' } : {}}
                        >
                            {post.summary}
                        </Typography>
                    )}

                    <Typography variant="body1" component="p">
                        {post.content.length > contentPreviewLength
                            ? `${post.content.substring(
                                  0,
                                  contentPreviewLength
                              )}...`
                            : post.content}
                    </Typography>

                    {post.content.length > contentPreviewLength && (
                        <Button
                            variant="outlined"
                            onClick={onFullScreenClick}
                            sx={{ mt: 2 }}
                        >
                            Continue Reading
                        </Button>
                    )}
                </CardContent>
            </FrostedGlassBox>
        </Fade>
    );
};

export default BlogPostCard;
