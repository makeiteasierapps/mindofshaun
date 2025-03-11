import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AdminContainer, AdminHeader } from '../styles/BlogAdmin.styles';
import PostForm from './PostForm';
import PostList from './PostList';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { usePosts } from '../../contexts/PostsContext';

const BlogAdmin = ({ onLogout }) => {
    const [editingPost, setEditingPost] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const { posts, loading, createPost, updatePost, deletePost } = usePosts();

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

            <Typography variant="h4" component="h3" sx={{ mt: 4, mb: 2 }}>
                Manage Posts
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
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
    );
};

export default BlogAdmin;
