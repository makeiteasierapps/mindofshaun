import React, { useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    CircularProgress,
    Grid2,
} from '@mui/material';
import { TagsContainer } from '../BlogMain.styles';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatDate } from '../../../../../utils/utils';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../../../../contexts/PostsContext';
import { FrostedGlassBox, MainSectionContainer } from '../../../../../components/shared/styles';

const SinglePostView = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { loading, getPublishedPosts } = usePosts();

    // Reference to store the original body overflow style
    const originalBodyStyle = useRef('');
    // Reference to the container for scrolling
    const containerRef = useRef(null);

    // Get all published posts to find the current one and determine prev/next
    const publishedPosts = getPublishedPosts();

    // Sort posts by date (newest first) to match the display order in the blog
    const sortedPosts = [...publishedPosts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Find the current post and its index in the sorted list
    const post = publishedPosts.find((p) => p._id === postId);
    const currentIndex = sortedPosts.findIndex((p) => p._id === postId);

    // Determine if this is the first or last post
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === sortedPosts.length - 1;

    // Handle navigation to previous or next post
    const handleNavigate = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < sortedPosts.length) {
            navigate(`/blog/${sortedPosts[newIndex]._id}`);
        }
    };

    // Handle closing the post view
    const handleClose = () => {
        navigate('/');
    };

    // Effect to handle body scrolling and hide external UI elements
    useEffect(() => {
        // Store original body overflow style
        originalBodyStyle.current = document.body.style.overflow;

        // Prevent body scrolling when in full screen mode
        document.body.style.overflow = 'hidden';

        // Hide navigation and settings buttons if they exist
        const navToTopButton = document
            .querySelector('[data-testid="KeyboardArrowUpIcon"]')
            ?.closest('button');
        const settingsButton = document
            .querySelector('[data-testid="SettingsIcon"]')
            ?.closest('button');

        if (navToTopButton) navToTopButton.style.display = 'none';
        if (settingsButton) settingsButton.style.display = 'none';

        // Reset scroll position of the full screen container
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }

        // Clean up function to restore original styles and show buttons again
        return () => {
            document.body.style.overflow = originalBodyStyle.current;

            if (navToTopButton) navToTopButton.style.display = '';
            if (settingsButton) settingsButton.style.display = '';
        };
    }, [postId]); // Re-run when postId changes

    if (loading) {
        return (
            <Box
                sx={{
                    bgcolor: 'background.default',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return (
            <Box
                sx={{
                    bgcolor: 'background.default',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Post Not Found
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <IconButton
                        onClick={handleClose}
                        aria-label="Return to blog"
                        color="primary"
                    >
                        <ArrowBackIcon /> Return to Blog
                    </IconButton>
                </Box>
            </Box>
        );
    }
    console.log(post);

    return (
        <>
            {/* Sticky header */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'background.paper',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 1,
                    p: 2,
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" noWrap sx={{ maxWidth: '70%' }}>
                    {post.title}
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => handleNavigate(-1)}
                        disabled={isFirst}
                        sx={{ mr: 1 }}
                        aria-label="Previous post"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleNavigate(1)}
                        disabled={isLast}
                        sx={{ mr: 1 }}
                        aria-label="Next post"
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleClose}
                        aria-label="Exit full screen"
                    >
                        <FullscreenExitIcon />
                    </IconButton>
                </Box>
            </Box>

            <MainSectionContainer>
                <FrostedGlassBox sx={{ p: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {post.title}
                </Typography>

                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                >
                    {post.author && `By ${post.author} • `}
                    {formatDate(post.created_at)}
                </Typography>

                <TagsContainer sx={{ mb: 3 }}>
                    {post.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                    ))}
                </TagsContainer>
                {/* TLDR */}
                {post.ai_results.publishingPackage.blog_summary && (
                    <FrostedGlassBox
                        featured
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            component="p"
                            color="text.secondary"
                            sx={{
                                fontStyle: 'italic',
                                mb: 0,
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'inherit',
                            }}
                        >
                            {post.ai_results.publishingPackage.blog_summary}
                        </Typography>
                    </FrostedGlassBox>
                )}

                {/* Content */}
                <Typography
                    variant="body1"
                    sx={{
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {post.content}
                    </Typography>
                </FrostedGlassBox>
            </MainSectionContainer>
        </>
    );
};

export default SinglePostView;
