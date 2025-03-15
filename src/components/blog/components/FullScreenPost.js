import React, { useEffect, useRef } from 'react';
import { Box, Typography, Chip, IconButton, Portal } from '@mui/material';
import { TagsContainer } from '../styles/Blog.styles';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatDate } from '../utils/blogUtils';

const FullScreenPost = ({ post, onClose, onNavigate, isFirst, isLast }) => {
    // Reference to store the original body overflow style
    const originalBodyStyle = useRef('');
    // Reference to the full screen container for scrolling
    const containerRef = useRef(null);

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
    }, [post._id]); // Re-run when post changes

    if (!post) return null;

    return (
        <Portal>
            <Box
                ref={containerRef}
                sx={{
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1400, // Higher than other UI elements
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
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
                            onClick={() => onNavigate(-1)}
                            disabled={isFirst}
                            sx={{ mr: 1 }}
                            aria-label="Previous post"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => onNavigate(1)}
                            disabled={isLast}
                            sx={{ mr: 1 }}
                            aria-label="Next post"
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                        <IconButton
                            onClick={onClose}
                            aria-label="Exit full screen"
                        >
                            <FullscreenExitIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{ p: 4, maxWidth: '800px', mx: 'auto', width: '100%' }}
                >
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

                    {post.summary && (
                        <Box
                            sx={{
                                borderLeft: '4px solid',
                                borderColor: 'primary.main',
                                pl: 2,
                                py: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                paragraph
                                sx={{
                                    fontStyle: 'italic',
                                    mb: 0,
                                }}
                            >
                                {post.summary}
                            </Typography>
                        </Box>
                    )}

                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                        }}
                    >
                        {post.content}
                    </Typography>
                </Box>
            </Box>
        </Portal>
    );
};

export default FullScreenPost;
