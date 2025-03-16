import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Portal,
    Tabs,
    Tab,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

// Blog components
import PostForm from '../blog/core/PostForm';
import PostList from '../blog/core/PostList';
import DeleteConfirmationDialog from '../blog/core/DeleteConfirmationDialog';
import { usePosts } from '../blog/context/PostsContext';
import { useBlogHandlers } from './blogHandlers';

// Project components
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useProjects } from '../../contexts/ProjectsContext';

// Styled components
import {
    AdminContainer,
    AdminHeader,
    ContentContainer,
} from './ContentManager.styles';

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

    // Project state
    const [editingProject, setEditingProject] = useState(null);
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [projectDeleteDialogOpen, setProjectDeleteDialogOpen] =
        useState(false);

    // Context hooks
    const { posts, loading: postsLoading } = usePosts();

    const {
        projects,
        loading: projectsLoading,
        createProject,
        updateProject,
        deleteProject,
    } = useProjects();

    // Tab change handler
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Blog handlers
    const {
        editingPost,
        deleteDialogOpen,
        handleEditPost,
        handleDeletePostClick,
        handleDeletePostConfirm,
        handlePostFormSubmit,
        handleCancelPostEdit,
        setEditingPost,
        setDeleteDialogOpen,
    } = useBlogHandlers();

    // Project handlers
    const handleEditProject = (project) => {
        setEditingProject(project);
        setIsCreatingProject(false);
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
            setIsCreatingProject(false);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleCancelProjectEdit = () => {
        setEditingProject(null);
        setIsCreatingProject(false);
    };

    const handleCreateNewProject = () => {
        setEditingProject(null);
        setIsCreatingProject(true);
    };

    return (
        <Portal>
            <AdminContainer>
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
                        {editingProject || isCreatingProject ? (
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
                                        onClick={handleCreateNewProject}
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
