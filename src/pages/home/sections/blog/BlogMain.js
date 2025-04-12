import React, { useState, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { usePosts } from '../../../../contexts/PostsContext';
import { MainSectionContainer } from '../../../../components/shared/styles';
import { SearchToolbar, BlogPostCard, PostPagination } from './components';
import { useNavigate } from 'react-router-dom';
import { HeroImage } from '../hero/HeroMain.styles';
import { SectionHeader } from '../../../../components/shared/styles';
import blogImage from '../../../../assets/section_header_imgs/blog.webp';
import { AnimatedSection } from '../../../../components/shared/AnimatedSection';
const BlogMain = () => {
    const { loading, getPublishedPosts } = usePosts();
    const navigate = useNavigate();

    // Navigation and filtering states
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');

    // Get only published posts
    const publishedPosts = getPublishedPosts();

    // Filter posts by search term
    const filteredPosts = publishedPosts.filter((post) => {
        // Filter by search term
        const matchesSearch =
            searchTerm === '' ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.summary &&
                post.summary.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesSearch;
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

    const handleViewPost = useCallback(
        (postId) => {
            navigate(`/blog/${postId}`);
        },
        [navigate]
    );

    return (
        <MainSectionContainer id="blog">
            <AnimatedSection>
                <SectionHeader>
                    <HeroImage
                        src={blogImage}
                        alt="Blog Section"
                        draggable={false}
                        style={{ marginBottom: 0, animation: 'none' }}
                    />
                    <Box className="header-overlay">
                        <Typography variant="h2" className="header-title">
                            Things I've Wrote
                        </Typography>

                        <Typography variant="h6" className="header-description">
                            These are some of my thoughts and reflections on my
                            journey as a developer.
                        </Typography>
                    </Box>
                </SectionHeader>
            </AnimatedSection>

            <SearchToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <AnimatedSection>
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
                            <BlogPostCard
                                post={sortedPosts[0]}
                                onFullScreenClick={() =>
                                    handleViewPost(sortedPosts[0]._id)
                                }
                                featured={true}
                            />
                        )}

                        {/* Other posts */}
                        {currentPosts.map((post, index) => {
                            // Skip the first post on the first page since it's already shown as featured
                            if (currentPage === 1 && index === 0) return null;

                            return (
                                <BlogPostCard
                                    key={post._id}
                                    post={post}
                                    onFullScreenClick={() =>
                                        handleViewPost(post._id)
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
            </AnimatedSection>
        </MainSectionContainer>
    );
};

export default BlogMain;
