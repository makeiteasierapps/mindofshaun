import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import BlogAdmin from '../core/BlogAdmin';
import { useAuth } from '../../../contexts/AuthContext';
import { usePosts } from '../context/PostsContext';
import {
    BlogContainer,
    BlogHeader,
    SecretLoginButton,
} from '../styles/Blog.styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    FilterDrawer,
    LoginModal,
    FeaturedPost,
    PostCard,
    FullScreenPost,
    PostPagination,
} from '../components';

const Blog = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [password, setPassword] = useState('');
    const { isAuthenticated, login, logout } = useAuth();
    const { loading, getPublishedPosts } = usePosts();

    // Navigation and filtering states
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [fullScreenMode, setFullScreenMode] = useState(false);
    const [activePostIndex, setActivePostIndex] = useState(null);

    // Store the scroll position when entering full screen mode
    const [scrollPosition, setScrollPosition] = useState(0);

    // Get only published posts
    const publishedPosts = getPublishedPosts();

    // Extract all unique tags from posts
    const allTags = React.useMemo(() => {
        if (publishedPosts.length > 0) {
            const tags = new Set();
            publishedPosts.forEach((post) => {
                post.tags.forEach((tag) => tags.add(tag));
            });
            return Array.from(tags);
        }
        return [];
    }, [publishedPosts]);

    // Filter posts by tags and search term
    const filteredPosts = publishedPosts.filter((post) => {
        // Filter by tags if any are selected
        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every((tag) => post.tags.includes(tag));

        // Filter by search term
        const matchesSearch =
            searchTerm === '' ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.summary &&
                post.summary.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesTags && matchesSearch;
    });

    // Sort posts by date (newest first)
    const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTagSelect = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
        setCurrentPage(1); // Reset to first page when filtering changes
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleLogin = () => {
        if (login(password)) {
            setShowLoginModal(false);
            setPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const toggleFullScreenMode = useCallback(
        (index = null) => {
            if (!fullScreenMode) {
                // Save current scroll position when entering full screen
                setScrollPosition(window.scrollY);
            } else {
                // Restore scroll position when exiting full screen
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                }, 0);
            }

            setFullScreenMode(!fullScreenMode);
            setActivePostIndex(index);
        },
        [fullScreenMode, scrollPosition]
    );

    const navigatePost = (direction) => {
        const newIndex = activePostIndex + direction;
        if (newIndex >= 0 && newIndex < sortedPosts.length) {
            setActivePostIndex(newIndex);
        }
    };

    const handleTagClick = (tag) => {
        handleTagSelect(tag);
        setFilterDrawerOpen(true);
    };

    if (isAuthenticated) {
        return <BlogAdmin onLogout={logout} />;
    }

    return (
        <>
            {/* Full screen post view */}
            {fullScreenMode &&
                activePostIndex !== null &&
                sortedPosts[activePostIndex] && (
                    <FullScreenPost
                        post={sortedPosts[activePostIndex]}
                        onClose={() => toggleFullScreenMode()}
                        onNavigate={navigatePost}
                        isFirst={activePostIndex === 0}
                        isLast={activePostIndex === sortedPosts.length - 1}
                    />
                )}

            <BlogContainer id="blog">
                <BlogHeader>
                    <Typography variant="h2" component="h2" gutterBottom>
                        Blog
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Filter posts">
                            <IconButton
                                onClick={() => setFilterDrawerOpen(true)}
                            >
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        <SecretLoginButton
                            onClick={() => setShowLoginModal(true)}
                        />
                    </Box>
                </BlogHeader>

                {/* Filter drawer */}
                <FilterDrawer
                    open={filterDrawerOpen}
                    onClose={() => setFilterDrawerOpen(false)}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedTags={selectedTags}
                    handleTagSelect={handleTagSelect}
                    allTags={allTags}
                    clearFilters={clearFilters}
                />

                {/* Login modal */}
                <LoginModal
                    show={showLoginModal}
                    password={password}
                    setPassword={setPassword}
                    onLogin={handleLogin}
                    onCancel={() => setShowLoginModal(false)}
                />

                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : filteredPosts.length === 0 ? (
                    <Typography variant="body1">
                        {publishedPosts.length === 0
                            ? 'No blog posts yet. Check back soon!'
                            : 'No posts match your current filters.'}
                    </Typography>
                ) : (
                    <>
                        {/* Featured latest post (only on first page) */}
                        {currentPage === 1 && sortedPosts.length > 0 && (
                            <FeaturedPost
                                post={sortedPosts[0]}
                                onTagClick={handleTagClick}
                                onFullScreenClick={() =>
                                    toggleFullScreenMode(0)
                                }
                            />
                        )}

                        {/* Other posts */}
                        {currentPosts.map((post, index) => {
                            // Skip the first post on the first page since it's already shown as featured
                            if (currentPage === 1 && index === 0) return null;

                            const postIndex = indexOfFirstPost + index;

                            return (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    index={index}
                                    onTagClick={handleTagClick}
                                    onFullScreenClick={() =>
                                        toggleFullScreenMode(postIndex)
                                    }
                                    transitionDelay={index * 150}
                                />
                            );
                        })}

                        {/* Pagination */}
                        <PostPagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onChange={handlePageChange}
                        />
                    </>
                )}
            </BlogContainer>
        </>
    );
};

export default Blog;
