import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Portal,
    Tabs,
    Tab,
    Paper,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

// Blog components
import PostForm from '../blog/core/PostForm';
import PostList from '../blog/core/PostList';
import DeleteConfirmationDialog from '../blog/core/DeleteConfirmationDialog';
import { usePosts } from '../blog/context/PostsContext';

// Project components
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useProjects } from '../../contexts/ProjectsContext';

// Styled components
const AdminContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    zIndex: 9999,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
}));

const AdminHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(3),
}));

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`content-tabpanel-${index}`}
            aria-labelledby={`content-tab-${index}`}
            {...other}
            style={{ height: '100%' }}
        >
            {value === index && (
                <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
            )}
        </div>
    );
};

const ContentManager = ({ onLogout }) => {
    // Tab state
    const [activeTab, setActiveTab] = useState(0);

    // Blog state
    const [editingPost, setEditingPost] = useState(null);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Project state
    const [editingProject, setEditingProject] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [projectDeleteDialogOpen, setProjectDeleteDialogOpen] =
        useState(false);

    // References
    const originalBodyStyle = useRef('');
    const containerRef = useRef(null);
    const originalStyles = useRef({});

    // Context hooks
    const {
        posts,
        loading: postsLoading,
        createPost,
        updatePost,
        deletePost,
    } = usePosts();
    const {
        projects,
        loading: projectsLoading,
        createProject,
        updateProject,
        deleteProject,
    } = useProjects();

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
        ];

        // Store original styles and hide elements
        elementsToHide.forEach((element) => {
            if (element) {
                originalStyles.current[element.id || 'element'] =
                    element.style.display;
                element.style.display = 'none';
            }
        });

        // Cleanup function to restore original styles
        return () => {
            document.body.style.overflow = originalBodyStyle.current;

            // Restore original display styles
            Object.entries(originalStyles.current).forEach(
                ([elementId, style]) => {
                    const element =
                        document.getElementById(elementId) ||
                        elementsToHide[
                            Object.keys(originalStyles.current).indexOf(
                                elementId
                            )
                        ];
                    if (element) {
                        element.style.display = style;
                    }
                }
            );
        };
    }, []);

    // Tab change handler
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Blog handlers
    const handleEditPost = (post) => {
        setEditingPost(post);
    };

    const handleDeletePostClick = (post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const handleDeletePostConfirm = async () => {
        if (postToDelete) {
            try {
                await deletePost(postToDelete._id);
                setDeleteDialogOpen(false);
                setPostToDelete(null);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handlePostFormSubmit = async (formData) => {
        try {
            if (editingPost) {
                await updatePost(editingPost._id, formData);
            } else {
                await createPost(formData);
            }
            setEditingPost(null);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleCancelPostEdit = () => {
        setEditingPost(null);
    };

    // Project handlers
    const handleEditProject = (project) => {
        setEditingProject(project);
    };

    const handleDeleteProjectClick = (project) => {
        setProjectToDelete(project);
        setProjectDeleteDialogOpen(true);
    };

    const handleDeleteProjectConfirm = async () => {
        if (projectToDelete) {
            try {
                await deleteProject(projectToDelete._id);
                setProjectDeleteDialogOpen(false);
                setProjectToDelete(null);
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const handleProjectFormSubmit = async (formData) => {
        try {
            if (editingProject) {
                await updateProject(editingProject._id, formData);
            } else {
                await createProject(formData);
            }
            setEditingProject(null);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleCancelProjectEdit = () => {
        setEditingProject(null);
    };

    return (
        <Portal>
            <AdminContainer ref={containerRef}>
                <AdminHeader>
                    <Typography variant="h5" component="h1">
                        Content Manager
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<LogoutIcon />}
                        onClick={onLogout}
                    >
                        Exit
                    </Button>
                </AdminHeader>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        aria-label="content manager tabs"
                        centered
                    >
                        <Tab label="Blog Posts" />
                        <Tab label="Projects" />
                    </Tabs>
                </Box>

                <ContentContainer>
                    {/* Blog Posts Tab */}
                    <TabPanel value={activeTab} index={0}>
                        {editingPost ? (
                            <PostForm
                                post={editingPost}
                                onSubmit={handlePostFormSubmit}
                                onCancel={handleCancelPostEdit}
                            />
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Typography variant="h6">
                                        Manage Blog Posts
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={() => setEditingPost({})}
                                    >
                                        New Post
                                    </Button>
                                </Box>

                                {postsLoading ? (
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
                                        onEdit={handleEditPost}
                                        onDelete={handleDeletePostClick}
                                    />
                                )}
                            </>
                        )}

                        <DeleteConfirmationDialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            onConfirm={handleDeletePostConfirm}
                            title="Delete Blog Post"
                            content="Are you sure you want to delete this blog post? This action cannot be undone."
                        />
                    </TabPanel>

                    {/* Projects Tab */}
                    <TabPanel value={activeTab} index={1}>
                        {editingProject ? (
                            <ProjectForm
                                project={editingProject}
                                onSubmit={handleProjectFormSubmit}
                                onCancel={handleCancelProjectEdit}
                            />
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Typography variant="h6">
                                        Manage Projects
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={() => setEditingProject({})}
                                    >
                                        New Project
                                    </Button>
                                </Box>

                                {projectsLoading ? (
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
                                    <ProjectList
                                        projects={projects}
                                        loading={projectsLoading}
                                        onEdit={handleEditProject}
                                        onDelete={handleDeleteProjectClick}
                                    />
                                )}
                            </>
                        )}

                        <DeleteConfirmationDialog
                            open={projectDeleteDialogOpen}
                            onClose={() => setProjectDeleteDialogOpen(false)}
                            onConfirm={handleDeleteProjectConfirm}
                            title="Delete Project"
                            content="Are you sure you want to delete this project? This action cannot be undone."
                        />
                    </TabPanel>
                </ContentContainer>
            </AdminContainer>
        </Portal>
    );
};

export default ContentManager;
