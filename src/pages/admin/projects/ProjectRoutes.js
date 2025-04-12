import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProjects } from '../../../contexts/ProjectsContext';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useParams } from 'react-router-dom';

const EditProject = ({ onSubmit, onCancel }) => {
    const { id } = useParams();
    const { projects } = useProjects();
    const project = projects.find((p) => p._id === id);

    if (!project) {
        return <Typography>Project not found</Typography>;
    }

    return (
        <ProjectForm
            project={project}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
};

const ProjectRoutes = ({ handleDeleteClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        projects,
        loading: projectsLoading,
        createProject,
        updateProject,
    } = useProjects();

    const handleDeleteProjectClick = (project) => {
        handleDeleteClick({ type: 'project', id: project._id });
    };

    const handleCreateNewProject = () => {
        navigate('/admin/projects/new');
    };

    const handleEditProject = (project) => {
        navigate(`/admin/projects/edit/${project._id}`);
    };

    const handleProjectFormSubmit = async (formData) => {
        try {
            if (location.pathname.includes('/edit/')) {
                const projectId = location.pathname.split('/').pop();
                await updateProject(projectId, formData);
            } else {
                await createProject(formData);
            }
            navigate('/admin/projects');
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
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
                                onEdit={handleEditProject}
                                onDelete={handleDeleteProjectClick}
                            />
                        )}
                    </>
                }
            />
            <Route
                path="/new"
                element={
                    <ProjectForm
                        onSubmit={handleProjectFormSubmit}
                        onCancel={() => navigate('/admin/projects')}
                    />
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <EditProject
                        onSubmit={handleProjectFormSubmit}
                        onCancel={() => navigate('/admin/projects')}
                    />
                }
            />
        </Routes>
    );
};

export default ProjectRoutes;
