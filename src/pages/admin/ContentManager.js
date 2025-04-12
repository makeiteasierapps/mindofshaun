import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import useDeleteDialog from './useDeleteDialog';
import DeleteConfirmationDialog from '../../components/shared/DeleteConfirmationDialog';
import { usePosts } from '../../contexts/PostsContext';
import { useProjects } from '../../contexts/ProjectsContext';
import { useAuth } from '../../contexts/AuthContext';

// Component imports
import BlogRoutes from './blog/BlogRoutes';
import ProjectRoutes from './projects/ProjectRoutes';

// Styled components
import {
    AdminContainer,
    AdminHeader,
    ContentContainer,
} from './ContentManager.styles';

const ContentManager = ({ onLogout }) => {
    const location = useLocation();
    const { deletePost } = usePosts();
    const { deleteProject } = useProjects();
    const { logout } = useAuth();

    // Use the shared delete dialog hook
    const {
        open: deleteDialogOpen,
        itemToDelete,
        handleOpen: handleDeleteClick,
        handleClose: handleDeleteClose,
    } = useDeleteDialog();

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        try {
            if (itemToDelete.type === 'post') {
                await deletePost(itemToDelete.id);
            } else if (itemToDelete.type === 'project') {
                await deleteProject(itemToDelete.id);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            handleDeleteClose();
        }
    };

    const handleLogout = () => {
        logout();
        if (onLogout) onLogout();
    };

    return (
        <AdminContainer>
            <AdminHeader>
                <Typography variant="h5" component="h1">
                    Content Manager
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/admin/posts"
                        variant={
                            location.pathname.includes('/posts')
                                ? 'contained'
                                : 'outlined'
                        }
                        color="primary"
                    >
                        Blog Posts
                    </Button>
                    <Button
                        component={Link}
                        to="/admin/projects"
                        variant={
                            location.pathname.includes('/projects')
                                ? 'contained'
                                : 'outlined'
                        }
                        color="primary"
                    >
                        Projects
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Exit
                    </Button>
                </Box>
            </AdminHeader>

            <ContentContainer>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/admin/posts" replace />}
                    />
                    <Route
                        path="posts/*"
                        element={
                            <BlogRoutes
                                handleDeleteClick={handleDeleteClick}
                                handleDeleteClose={handleDeleteClose}
                            />
                        }
                    />
                    <Route
                        path="projects/*"
                        element={
                            <ProjectRoutes
                                handleDeleteClick={handleDeleteClick}
                                handleDeleteClose={handleDeleteClose}
                            />
                        }
                    />
                </Routes>

                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    content={`Are you sure you want to delete this ${
                        itemToDelete?.type || ''
                    }? This action cannot be undone.`}
                    onClose={handleDeleteClose}
                    onConfirm={handleDeleteConfirm}
                />
            </ContentContainer>
        </AdminContainer>
    );
};

export default ContentManager;
