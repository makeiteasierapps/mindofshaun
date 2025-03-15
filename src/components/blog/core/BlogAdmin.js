import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Portal,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    AdminContainer,
    AdminHeader,
} from '../../blog/styles/BlogAdmin.styles';
import PostForm from './PostForm';
import PostList from './PostList';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { usePosts } from '../context/PostsContext';

const BlogAdmin = ({ onLogout }) => {
    const [editingPost, setEditingPost] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    // Reference to store the original body overflow style
    const originalBodyStyle = useRef('');
    // Reference to the admin container for scrolling
    const containerRef = useRef(null);
    // References to store original display styles
    const originalStyles = useRef({});

    const { posts, loading, createPost, updatePost, deletePost } = usePosts();

    // Effect to handle body scrolling and hide external UI elements
    useEffect(() => {
        // Store original body overflow style
        originalBodyStyle.current = document.body.style.overflow;

        // Prevent body scrolling when in admin mode
        document.body.style.overflow = 'hidden';

        // Elements to hide when in admin mode
        const elementsToHide = [
            // Navigation button
            document
                .querySelector('[data-testid="KeyboardArrowUpIcon"]')
                ?.closest('button'),
            // Settings button
            document
                .querySelector('[data-testid="SettingsIcon"]')
                ?.closest('button'),
            // Conway's Game of Life controls
            document.getElementById('conway-controls'),
            document.querySelector('.conway-controls'),
            document.querySelector(
                '[aria-label="Conway\'s Game of Life Controls"]'
            ),
            // Try to find by content
            Array.from(document.querySelectorAll('div')).find(
                (el) =>
                    el.textContent?.includes("Conway's Game of Life") ||
                    el.textContent?.includes('Speed:') ||
                    el.textContent?.includes('RANDOMIZE')
            ),
            // Try to find any control panel at the bottom of the screen
            document.querySelector(
                '[style*="position: fixed"][style*="bottom: 0"]'
            ),
            // Try to find by child elements
            Array.from(document.querySelectorAll('div')).find(
                (el) =>
                    el.querySelector('button[aria-label="Pause"]') ||
                    el.querySelector('button[aria-label="Play"]')
            ),
        ].filter(Boolean); // Remove null/undefined elements

        // Store original styles and hide elements
        originalStyles.current = {};
        elementsToHide.forEach((element, index) => {
            if (element) {
                originalStyles.current[index] = {
                    display: element.style.display,
                    visibility: element.style.visibility,
                    opacity: element.style.opacity,
                    zIndex: element.style.zIndex,
                };
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.opacity = '0';
                element.style.zIndex = '-1';
            }
        });

        // Reset scroll position of the admin container
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }

        // Clean up function to restore original styles
        return () => {
            document.body.style.overflow = originalBodyStyle.current;

            // Restore original styles for all hidden elements
            elementsToHide.forEach((element, index) => {
                if (element) {
                    const original = originalStyles.current[index];
                    element.style.display = original.display;
                    element.style.visibility = original.visibility;
                    element.style.opacity = original.opacity;
                    element.style.zIndex = original.zIndex;
                }
            });
        };
    }, []); // Run only once on mount

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleDeleteClick = (post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!postToDelete) return;

        try {
            await deletePost(postToDelete._id);
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            setDeleteDialogOpen(false);
            setPostToDelete(null);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingPost) {
                // Update existing post
                await updatePost(editingPost._id, formData);
            } else {
                // Create new post
                await createPost(formData);
            }
            setEditingPost(null);
        } catch (error) {
            console.error('Error saving blog post:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

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
                    padding: 0,
                }}
            >
                <AdminContainer>
                    <AdminHeader>
                        <Typography variant="h2" component="h2">
                            Blog Admin
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<LogoutIcon />}
                            onClick={onLogout}
                        >
                            Logout
                        </Button>
                    </AdminHeader>

                    <PostForm
                        editingPost={editingPost}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelEdit}
                    />

                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{ mt: 4, mb: 2 }}
                    >
                        Manage Posts
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                p: 4,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <PostList
                            posts={posts}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    )}

                    <DeleteConfirmationDialog
                        open={deleteDialogOpen}
                        post={postToDelete}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={handleDeleteConfirm}
                    />
                </AdminContainer>
            </Box>
        </Portal>
    );
};

export default BlogAdmin;
